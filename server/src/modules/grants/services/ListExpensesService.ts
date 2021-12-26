import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import IExpensesRepository from '../infra/db/repositories/interfaces/IExpensesRepository';
import Expense from '../infra/db/entities/Expense';
import AppError from '../../../common/errors/AppError';

@injectable()
export default class ListExpensesService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,

    @inject('ExpensesRepository')
    private expensesRepository: IExpensesRepository,
  ) {}
  public async findAllByGrantId(id: string): Promise<Expense[]> {
    const grant = await this.grantsRepository.findById(id);

    if (!grant) {
      throw new AppError('A grant with the provided id does not exist.');
    }

    const expenses = await this.expensesRepository.findAllByGrantId(grant.id);

    return expenses;
  }
}
