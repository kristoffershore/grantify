import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListExpensesService from '../../../services/ListExpensesService';
import ShowExpenseService from '../../../services/ShowExpenseService';
import CreateExpenseService from '../../../services/CreateExpenseService';
import RemoveExpenseService from '../../../services/RemoveExpenseService';

export default class ExpensesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { grantId } = request.params;

    const listExpenses = container.resolve(ListExpensesService);

    const expenses = await listExpenses.findAllByGrantId(grantId);

    return response.json(expenses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { expenseId } = request.params;

    const showExpense = container.resolve(ShowExpenseService);

    const expense = await showExpense.execute({ id: expenseId });

    return response.json(expense);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, amount } = request.body;
    const { grantId } = request.params;

    const createExpense = container.resolve(CreateExpenseService);

    const expense = await createExpense.execute({
      name,
      amount,
      grantId,
    });

    return response.json(classToClass(expense));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { expenseId } = request.params;

    const deleteExpense = container.resolve(RemoveExpenseService);

    const expense = await deleteExpense.execute({
      id: expenseId,
    });

    return response.json(expense);
  }
}
