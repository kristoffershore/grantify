import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import AppError from '../../../common/errors/AppError';
import IExpensesRepository from '../infra/db/repositories/interfaces/IExpensesRepository';
import Expense from '../infra/db/entities/Expense';

interface IRequest {
  id: string;
}

@injectable()
export default class ShowExpenseService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,

    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Expense | undefined> {
    const expense = await this.expensesRepository.findById(id);

    if (!expense) {
      throw new AppError('An expense with the given id does not exist.');
    }

    return expense;
  }
}
