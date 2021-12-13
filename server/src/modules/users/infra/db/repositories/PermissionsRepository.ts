import { getRepository, Repository } from 'typeorm';

import PermissionType from '../entities/PermissionType';
import IPermissionsRepository from './interfaces/IPermissionsRepository';
import ICreatePermissionDTO from '../../../dtos/ICreatePermissionDTO';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<PermissionType>;

  constructor() {
    this.ormRepository = getRepository(PermissionType);
  }

  public async findByDisplayName(
    name: string,
  ): Promise<PermissionType | undefined> {
    const permission = await this.ormRepository.findOne({
      where: {
        displayName: name,
      },
    });

    return permission;
  }

  public async findAll(): Promise<PermissionType[]> {
    return this.ormRepository.find();
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<PermissionType> {
    const permission = this.ormRepository.create(permissionData);

    await this.ormRepository.save(permission);

    return permission;
  }

  public async save(permission: PermissionType): Promise<PermissionType> {
    return this.ormRepository.save(permission);
  }
}

export default PermissionsRepository;
