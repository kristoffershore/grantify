import { inject, injectable } from 'tsyringe';
import PermissionType from '../infra/db/entities/PermissionType';
import IPermissionsRepository from '../infra/db/repositories/interfaces/IPermissionsRepository';

@injectable()
export default class ListPermissionsService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}
  public async execute(): Promise<PermissionType[]> {
    return this.permissionsRepository.findAll();
  }
}
