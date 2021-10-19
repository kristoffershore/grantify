import { inject, injectable } from 'tsyringe';

import AppError from '@common/errors/AppError';
import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';

interface IRequest {
  grantName: string;
}

@injectable()
export default class ShowGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}

  public async execute({ grantName }: IRequest): Promise<Grant | undefined> {
    const grant = await this.grantsRepository.findByGrantName(grantName);

    if (!grant) {
      throw new AppError('A grant with the given name does not exist.');
    }

    return grant;
  }
}
