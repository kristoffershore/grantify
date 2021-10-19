import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';

interface IRequest {
  sponsorName: string;
}

@injectable()
export default class ListGrantService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,
  ) {}
  public async findAll(): Promise<Grant[]> {
    const grants = await this.grantsRepository.findAll();

    return grants;
  }

  public async findBySponsorName({ sponsorName }: IRequest): Promise<Grant[]> {
    const grants = await this.grantsRepository.findAllBySponsorName(
      sponsorName,
    );

    return grants;
  }
}
