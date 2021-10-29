import ICreateGrantDTO from '@modules/grants/dtos/ICreateGrantDTO';
import { getRepository, Repository } from 'typeorm';
import Grant from '../entities/Grant';

import IGrantsRepository from './interfaces/IGrantsRepository';

export default class GrantsRepository implements IGrantsRepository {
  private ormRepository: Repository<Grant>;

  constructor() {
    this.ormRepository = getRepository(Grant);
  }

  public async findById(id: string): Promise<Grant | undefined> {
    const grant = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return grant;
  }

  public async findAll(): Promise<Grant[]> {
    const grants = await this.ormRepository.find({});

    return grants;
  }

  public async findByGrantName(grantName: string): Promise<Grant[]> {
    const grants = await this.ormRepository.find({
      where: {
        grantName,
      },
    });

    return grants;
  }

  public async findAllBySponsorName(sponsorName: string): Promise<Grant[]> {
    const grants = await this.ormRepository.find({
      where: {
        sponsorName,
      },
    });

    return grants;
  }

  public async create(grantData: ICreateGrantDTO): Promise<Grant> {
    const grant = this.ormRepository.create(grantData);

    await this.ormRepository.save(grant);

    return grant;
  }

  public async save(grant: Grant): Promise<Grant> {
    return this.ormRepository.save(grant);
  }

  public async delete(grant: Grant): Promise<Grant> {
    return this.ormRepository.remove(grant);
  }
}
