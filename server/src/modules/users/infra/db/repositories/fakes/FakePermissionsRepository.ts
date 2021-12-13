import IPermissionsRepository from '../interfaces/IPermissionsRepository';
import PermissionType from '../../entities/PermissionType';
import ICreatePermissionDTO from '../../../../dtos/ICreatePermissionDTO';

class FakePermissionsRepository implements IPermissionsRepository {
  private permissions: PermissionType[] = [];

  public async findByDisplayName(
    name: string,
  ): Promise<PermissionType | undefined> {
    const permission = this.permissions.find(p => p.displayName === name);

    return permission;
  }

  public async findAll(): Promise<PermissionType[]> {
    return this.permissions;
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<PermissionType> {
    const permission = new PermissionType();

    permission.id = Math.floor(Math.random() * 1000);
    permission.displayName = permissionData.displayName;

    this.permissions.push(permission);

    return permission;
  }

  public async save(permission: PermissionType): Promise<PermissionType> {
    const findIndex = this.permissions.findIndex(
      findPerm => findPerm.id === permission.id,
    );

    this.permissions[findIndex] = permission;

    return permission;
  }
}

export default FakePermissionsRepository;
