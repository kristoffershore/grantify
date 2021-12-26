import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  grantId: string;
}

@injectable()
export default class ShowGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}

  public async execute({ grantId }: IRequest): Promise<Grant | undefined> {
    const grant = await this.grantsRepository.findById(grantId);

    if (!grant) {
      throw new AppError('A grant with the given id does not exist.');
    }

    return grant;
  }
}
