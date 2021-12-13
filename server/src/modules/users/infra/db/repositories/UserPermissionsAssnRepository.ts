import { getRepository, Repository } from 'typeorm';
import ICreateUserPermissionsDTO from '../../../dtos/ICreateUserPermissionsDTO';
import UserPermissionAssociation from '../entities/UserPermissionAssociation';

import IUserPermissionsAssnRepository from './interfaces/IUserPermissionsAssnRepository';

class UserPermissionsAssnRepository implements IUserPermissionsAssnRepository {
  private ormRepository: Repository<UserPermissionAssociation>;

  constructor() {
    this.ormRepository = getRepository(UserPermissionAssociation);
  }

  public async findById(
    id: string,
  ): Promise<UserPermissionAssociation | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAllByPermissionTypeId(
    id: number,
  ): Promise<UserPermissionAssociation[]> {
    const userPermissions = await this.ormRepository.find({
      where: {
        permissionTypeId: id,
      },
    });

    return userPermissions;
  }
  public async findAllByUserId(
    id: string,
  ): Promise<UserPermissionAssociation[]> {
    const userPermissions = await this.ormRepository.find({
      where: {
        userId: id,
      },
    });

    return userPermissions;
  }

  public async create(
    userPermissionsData: ICreateUserPermissionsDTO,
  ): Promise<UserPermissionAssociation> {
    const userPermissions = this.ormRepository.create(userPermissionsData);

    await this.ormRepository.save(userPermissions);

    return userPermissions;
  }

  public async save(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation> {
    return this.ormRepository.save(userPermissions);
  }

  public async delete(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation> {
    return this.ormRepository.remove(userPermissions);
  }
}

export default UserPermissionsAssnRepository;
