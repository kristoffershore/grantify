import AppError from '../../../common/errors/AppError';
import FakeExpensesRepository from '../infra/db/repositories/fakes/FakeExpensesRepository';
import FakeGrantsRepository from '../infra/db/repositories/fakes/FakeGrantsRepository';
import CreateExpenseService from './CreateExpenseService';

let fakeGrantsRepository: FakeGrantsRepository;
let fakeExpensesRepository: FakeExpensesRepository;
let createExpense: CreateExpenseService;

describe('CreateExpense', () => {
  beforeEach(() => {
    fakeGrantsRepository = new FakeGrantsRepository();
    fakeExpensesRepository = new FakeExpensesRepository();

    createExpense = new CreateExpenseService(
      fakeGrantsRepository,
      fakeExpensesRepository,
    );
  });

  it('should be able to create a new expense', async () => {
    const grant = await fakeGrantsRepository.create({
      grantName: 'COVID Grant Fall 2021',
      openDate: new Date('2021-10-18T03:24:00'),
      closeDate: new Date('2021-10-25T03:24:00'),
      status: 'Pending',
      amountRequested: 2000.0,
      amountApproved: 1000.0,
      sponsorName: 'UNF',
      sponsorUrl: 'www.unf.edu',
      dateWhenFundsWereReceived: new Date('2021-10-21T03:24:00'),
      expirationDate: new Date('2021-12-30T03:24:00'),
    });

    const expense = await createExpense.execute({
      name: 'Salaries',
      amount: 4000.0,
      grantId: grant.id,
    });

    expect(expense).toHaveProperty('id');
  });

  it('should not be able to create a new expense attached to a grant that does not exist', async () => {
    await expect(
      createExpense.execute({
        name: 'Sample expense name',
        amount: 3000.59,
        grantId: 'non-existent grant id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
