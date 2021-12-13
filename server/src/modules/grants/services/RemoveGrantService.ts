import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
export default class RemoveGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Grant | undefined> {
    const grant = await this.grantsRepository.findById(id);

    if (!grant) {
      throw new AppError('A grant with the ID provided does not exist.');
    }

    await this.grantsRepository.delete(grant);

    return grant;
  }
}
