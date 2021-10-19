import { inject, injectable } from 'tsyringe';

import AppError from '@common/errors/AppError';
import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';

interface IRequest {
  grantName: string;
  openDate: Date;
  closeDate: Date;
  status: string;
  amountRequested: number;
  amountApproved: number;
  sponsorName: string;
  sponsorUrl: string;
}

@injectable()
export default class CreateGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}

  public async execute({
    grantName,
    openDate,
    closeDate,
    status,
    amountRequested,
    amountApproved,
    sponsorName,
    sponsorUrl,
  }: IRequest): Promise<Grant | undefined> {
    const checkIfGrantNameExists = await this.grantsRepository.findByGrantName(
      grantName,
    );

    if (checkIfGrantNameExists) {
      throw new AppError('A grant with the name provided already exists.');
    }

    const grant = await this.grantsRepository.create({
      grantName,
      openDate,
      closeDate,
      status,
      amountRequested,
      amountApproved,
      sponsorName,
      sponsorUrl,
    });

    return grant;
  }
}
