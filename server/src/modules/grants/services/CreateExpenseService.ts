import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';
import AppError from '../../../common/errors/AppError';
import IExpensesRepository from '../infra/db/repositories/interfaces/IExpensesRepository';
import Expense from '../infra/db/entities/Expense';

interface IRequest {
  name: string;
  lineItemCode: number;
  budget: number;
  amountSpent: number;
  date: string;
  grantId: string;
}

@injectable()
export default class CreateExpenseService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,

    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  public async execute({
    name,
    lineItemCode,
    budget,
    amountSpent,
    date,
    grantId,
  }: IRequest): Promise<Expense | undefined> {
    const checkIfGrantExists = await this.grantsRepository.findById(grantId);

    if (!checkIfGrantExists) {
      throw new AppError('A grant with the id provided does not exist.');
    }

    const expense = await this.expensesRepository.create({
      name,
      lineItemCode,
      budget,
      amountSpent,
      date,
      grantId,
    });

    return expense;
  }
}
