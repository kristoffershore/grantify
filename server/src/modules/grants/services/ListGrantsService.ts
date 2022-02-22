import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import Grant from '../infra/db/entities/Grant';

interface IGrantRequest {
  grantName: string;
}

interface IWriterRequest {
  writerName: string;
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

  public async findByWriterName({
    writerName,
  }: IWriterRequest): Promise<Grant[]> {
    const grants = await this.grantsRepository.findAllByWriterName(writerName);

    return grants;
  }

  public async findByGrantName({
    grantName,
  }: IGrantRequest): Promise<Grant | undefined> {
    const grant = await this.grantsRepository.findByGrantName(grantName);

    return grant;
  }
}
