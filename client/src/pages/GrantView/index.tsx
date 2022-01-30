import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useAuth } from '../../hooks/auth';
import SideBar from '../../components/SideBar';
import { useHistory, useParams } from 'react-router';
import api from '../../services/api';
import { Grant } from '../../types/Grant';
import { BsFillArchiveFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import { AnimationContainer } from './styles';
import { Expense } from '../../types/Expense';
import { useToast } from '../../hooks/toast';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const GrantView: React.FC = () => {
  const [grant, setGrant] = useState<Grant>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const deleteExpense = useCallback(
    (grantId: string, expenseId: string) => {
      api
        .get<Expense>(`grants/view/${grantId}/${expenseId}`)
        .then(async response => {
          setExpenses(
            expenses.filter(expense => expense.id !== response.data.id),
          );
          await api.delete(`grants/view/${grantId}/${response.data.id}`);

          addToast({
            type: 'success',
            title: 'Expense removed!',
            description: 'The changes have been saved successfully.',
          });
        });
    },
    [addToast, expenses],
  );

  const onSubmit = useCallback(
    async (data: Expense) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Expense name is required'),
          amount: Yup.number().required('Amount is required'),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = {
          name: data.name,
          amount: data.amount,
        };

        const expenseResponse = await api.post<Expense>(
          `/grants/view/${id}`,
          formData,
        );

        setExpenses([
          ...expenses,
          {
            id: expenseResponse.data.id,
            name: expenseResponse.data.name,
            amount: expenseResponse.data.amount,
            grantId: expenseResponse.data.grantId,
          },
        ]);

        setOpen(false);

        addToast({
          type: 'success',
          title: 'Expense added successfully!',
          description: 'The expenses table has been updated.',
        });
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Unable to add new expense',
          description: 'Please try again.',
        });
      }
    },
    [id, expenses, addToast],
  );

  useEffect(() => {
    api.get<Grant>(`grants/${id}`).then(response => setGrant(response.data));
    api
      .get<Expense[]>(`grants/view/${id}`)
      .then(response => setExpenses(response.data));
  }, [id]);

  return (
    <>
      {grant && (
        <div className="flex">
          <SideBar signOut={signOut} />
          <div className="content-container">
            <div className="content-list">
              <GrantGrid grant={grant} expenses={expenses} />
              <div className="my-4 text-gray-500">
                <Link
                  to={`${id}/archive`}
                  className="flex flex-row items-center"
                >
                  <BsFillArchiveFill />
                  <p className="mx-2">Archive</p>
                </Link>
              </div>
              <ExpensesBreakdown
                expenses={expenses}
                setOpen={setOpen}
                deleteExpense={deleteExpense}
              />
              {open && (
                <AddExpenseForm
                  setOpen={setOpen}
                  onSubmit={onSubmit}
                  formRef={formRef}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const GrantGrid: React.FC<{ grant: Grant; expenses: Expense[] }> = ({
  grant,
  expenses,
}) => {
  return (
    <>
      <h1 className="content-title">{grant.grantName}</h1>

      <section className="grid grid-cols-3 gap-5">
        <DataBox
          title={'Amount Requested'}
          data={grant.amountRequested.toString()}
        />
        {grant.amountApproved && (
          <DataBox
            title={'Amount Approved'}
            data={grant.amountApproved.toString()}
          />
        )}
        {grant.amountApproved && expenses.length !== 0 && (
          <DataBox
            title={'Remaining Balance'}
            data={(
              grant.amountApproved -
              expenses
                .map(expense => Number(expense.amount))
                .reduce((acc, cv) => (acc += cv))
            ).toFixed(2)}
          />
        )}
        <DataBox title={'Open Date'} data={grant.openDate} />
        <DataBox title={'Close Date'} data={grant.closeDate} />
        {grant.expirationDate && (
          <DataBox title={'Expiration Date'} data={grant.expirationDate} />
        )}
        {grant.dateWhenFundsWereReceived && (
          <DataBox
            title={'Date When Funds Were Received'}
            data={grant.dateWhenFundsWereReceived}
          />
        )}
        {grant.sponsorName && (
          <DataBox
            title={'Grantor'}
            data={grant.sponsorName}
            link={grant.sponsorUrl}
          />
        )}
        <DataBox title={'Status'} data={grant.status} />
      </section>
    </>
  );
};

const DataBox: React.FC<{ title: string; data: string; link?: string }> = ({
  title,
  data,
  link,
}) => {
  return (
    <div className="data-box">
      <div className="data-box-title">
        <h4>{title}</h4>
      </div>
      <div className="data-box-info">
        {/* {!isNaN(Number(data)) ? <h3>${data}</h3> : <h3>${data}</h3>} */}
        {!!Date.parse(data) && isNaN(Number(data)) && (
          <h3>
            {new Date(data).getUTCMonth() + 1}/{new Date(data).getUTCDate()}/
            {new Date(data).getUTCFullYear()}
          </h3>
        )}

        <span className="text-lg antialiased font-bold">
          {!isNaN(Number(data)) && <h3>${data}</h3>}
        </span>

        {title === 'Grantor' && !link && <h3>{data}</h3>}

        {title === 'Grantor' && link && (
          <h3>
            <a href={link}>{data}</a>
          </h3>
        )}

        {title === 'Status' && data === 'Approved' && (
          <h3 className="px-2 inline-flex text-md leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {data}
          </h3>
        )}
        {title === 'Status' && data === 'Pending' && (
          <h3 className="px-2 inline-flex text-md leading-5 font-semibold rounded-full bg-gray-300 text-gray-800">
            {data}
          </h3>
        )}
      </div>

      {/* {!isNaN(Number(data)) && (
        <div className="data-box-graph">
          <img
            src={Math.floor(Math.random() * 2 + 1) % 2 === 0 ? dummy1 : dummy2}
            alt="Graph"
          />
        </div>
      )} */}
    </div>
  );
};

const ExpensesBreakdown: React.FC<{
  expenses: Expense[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  deleteExpense: any;
}> = ({ expenses, setOpen, deleteExpense }) => {
  return (
    <>
      <h1 className="content-title">Expenses</h1>
      <section className="grid grid-cols-1 w-7/10">
        <div className="bg-white my-4 p-6 rounded-xl mx-2 shadow-lg">
          <div className="">
            <div className="flex justify-start mb-3">
              <h3 className="text-gray-700">Breakdown</h3>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mx-2 text-indigo-600 hover:text-indigo-900"
              >
                +
              </button>
            </div>
            <Divider />
            <div className="flex flex-col my-4">
              {expenses.map(expense => (
                <ExpenseRow
                  key={expense.id}
                  expense={expense}
                  deleteExpense={deleteExpense}
                />
              ))}
            </div>
            {expenses.length !== 0 && <Divider />}
            <div className="flex flex-col items-center">
              <h3 className="my-4 text-gray-500">Total expenses</h3>
              <h3 className="text-lg">
                $
                {expenses.length !== 0
                  ? expenses
                      .map(expense => Number(expense.amount))
                      .reduce((acc, cv) => (acc += cv))
                  : 0}
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ExpenseRow: React.FC<{ expense: Expense; deleteExpense: any }> = ({
  expense,
  deleteExpense,
}) => {
  return (
    <div className="grid grid-cols-3">
      <h3 className="text-gray-500">{expense.name}</h3>
      <h3 className="flex justify-center">${expense.amount}</h3>

      <span className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line no-restricted-globals
            const option = confirm(
              `Are you sure you want to delete the expense ${expense.name}? This action cannot be reversed`,
            );
            option && deleteExpense(expense.grantId, expense.id);
          }}
          className="w-16 text-indigo-600 hover:text-indigo-900"
        >
          Remove
        </button>
      </span>
    </div>
  );
};

const AddExpenseForm: React.FC<{
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: any;
  formRef: any;
}> = ({ setOpen, onSubmit, formRef }) => {
  return (
    <AnimationContainer>
      <section className="grid grid-cols-1">
        <div className="bg-white my-4 p-6 rounded-xl mx-2 shadow-lg">
          <div className="">
            <div className="flex justify-between mb-3">
              <h3 className="text-gray-700">Add a new expense</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mx-2 text-indigo-600 hover:text-indigo-800"
              >
                X
              </button>
            </div>
            <Divider />
            <div className="flex flex-col my-4">
              <Form onSubmit={onSubmit} ref={formRef}>
                <Input name="name" placeholder="Name" />
                <Input name="amount" placeholder="Amount" />
                <Button type="submit">Add</Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </AnimationContainer>
  );
};

export default GrantView;
