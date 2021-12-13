import IUserPermissionsAssnRepository from '../interfaces/IUserPermissionsAssnRepository';
import ICreateUserPermissionsDTO from '../../../../dtos/ICreateUserPermissionsDTO';
import { v4 as uuid } from 'uuid';
import UserPermissionAssociation from '../../entities/UserPermissionAssociation';

class FakeUserPermissionsRepository implements IUserPermissionsAssnRepository {
  private usersPermissions: UserPermissionAssociation[] = [];

  public async findById(
    id: string,
  ): Promise<UserPermissionAssociation | undefined> {
    return this.usersPermissions.find(up => up.id === id);
  }

  public async findAllByPermissionTypeId(
    id: number,
  ): Promise<UserPermissionAssociation[]> {
    const userPermissions = this.usersPermissions.filter(
      up => up.permissionTypeId === id,
    );

    return userPermissions;
  }
  public async findAllByUserId(
    id: string,
  ): Promise<UserPermissionAssociation[]> {
    const userPermissions = this.usersPermissions.filter(
      up => up.userId === id,
    );

    return userPermissions;
  }

  public async create(
    userPermissionData: ICreateUserPermissionsDTO,
  ): Promise<UserPermissionAssociation> {
    const userPermissions = new UserPermissionAssociation();

    userPermissions.id = uuid();
    userPermissions.userId = uuid();
    userPermissions.permissionTypeId = Math.floor(Math.random() * 1000);

    this.usersPermissions.push(userPermissions);

    return userPermissions;
  }

  public async save(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation> {
    const findIndex = this.usersPermissions.findIndex(
      findUP => findUP.id === userPermissions.id,
    );

    this.usersPermissions[findIndex] = userPermissions;

    return userPermissions;
  }

  public async delete(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation> {
    const findAssociation = userPermissions;

    this.usersPermissions = this.usersPermissions.filter(
      up => up.id !== userPermissions.id,
    );

    return findAssociation;
  }
}

export default FakeUserPermissionsRepository;
