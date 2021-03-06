import ICreateGrantDTO from '../../../../../../modules/grants/dtos/ICreateGrantDTO';
import { v4 as uuid } from 'uuid';
import Grant from '../../entities/Grant';

import IGrantsRepository from '../interfaces/IGrantsRepository';

export default class FakeGrantsRepository implements IGrantsRepository {
  private grants: Grant[] = [];

  public async findById(id: string): Promise<Grant | undefined> {
    const findGrant = this.grants.find(grant => grant.id === id);

    return findGrant;
  }

  public async findAll(): Promise<Grant[]> {
    return this.grants.filter(g => g.id);
  }

  public async findByGrantName(grantName: string): Promise<Grant | undefined> {
    const grant = this.grants.find(grant => grant.grantName === grantName);

    return grant;
  }

  public async findAllByWriterName(writerName: string): Promise<Grant[]> {
    const grants = this.grants.filter(grant => grant.writerName === writerName);

    return grants;
  }

  public async create(grantData: ICreateGrantDTO): Promise<Grant> {
    const grant = new Grant();

    Object.assign(grant, { id: uuid() }, grantData);

    this.grants.push(grant);

    return grant;
  }

  public async save(grant: Grant): Promise<Grant> {
    const findIndex = this.grants.findIndex(
      findGrant => findGrant.id === grant.id,
    );

    this.grants[findIndex] = grant;

    return grant;
  }

  public async delete(grant: Grant): Promise<Grant> {
    const findGrant = grant;

    this.grants = this.grants.filter(g => g.id !== grant.id);

    return findGrant;
  }
}
