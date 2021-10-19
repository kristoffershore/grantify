import { inject, injectable } from 'tsyringe';

import AppError from '@common/errors/AppError';
import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';

interface IRequest {
  id: string;
  grantName?: string;
  openDate?: Date;
  closeDate?: Date;
  status?: string;
  amountRequested?: number;
  amountApproved?: number;
  sponsorName?: string;
  sponsorUrl?: string;
}

@injectable()
export default class UpdateGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}

  public async execute({
    id,
    grantName,
    openDate,
    closeDate,
    status,
    amountRequested,
    amountApproved,
    sponsorName,
    sponsorUrl,
  }: IRequest): Promise<Grant | undefined> {
    const grant = await this.grantsRepository.findById(id);

    if (!grant) {
      throw new AppError('A grant with the ID provided does not exist.');
    }

    grantName && (grant.grantName = grantName);
    openDate && (grant.openDate = openDate);
    closeDate && (grant.closeDate = closeDate);
    status && (grant.status = status);
    amountRequested && (grant.amountRequested = amountRequested);
    amountApproved && (grant.amountApproved = amountApproved);
    sponsorName && (grant.sponsorName = sponsorName);
    sponsorUrl && (grant.sponsorUrl = sponsorUrl);

    await this.grantsRepository.save(grant);

    return grant;
  }
}
