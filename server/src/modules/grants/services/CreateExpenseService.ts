import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';
import AppError from '../../../common/errors/AppError';
import IExpensesRepository from '../infra/db/repositories/interfaces/IExpensesRepository';
import Expense from '../infra/db/entities/Expense';

interface IRequest {
  name: string;
  amount: number;
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
    amount,
    grantId,
  }: IRequest): Promise<Expense | undefined> {
    const checkIfGrantExists = await this.grantsRepository.findById(grantId);

    if (!checkIfGrantExists) {
      throw new AppError('A grant with the id provided does not exist.');
    }

    const expense = await this.expensesRepository.create({
      name,
      amount,
      grantId,
    });

    return expense;
  }
}
