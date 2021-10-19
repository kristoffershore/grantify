import ICreateGrantDTO from '@modules/grants/dtos/ICreateGrantDTO';
import Grant from '../../entities/Grant';

export default interface IGrantsRepository {
  findById(id: string): Promise<Grant | undefined>;
  findAll(): Promise<Grant[]>;
  findByGrantName(name: string): Promise<Grant | undefined>;
  findAllBySponsorName(sponsorName: string): Promise<Grant[]>;
  create(data: ICreateGrantDTO): Promise<Grant>;
  save(grant: Grant): Promise<Grant>;
  delete(grant: Grant): Promise<Grant>;
}
