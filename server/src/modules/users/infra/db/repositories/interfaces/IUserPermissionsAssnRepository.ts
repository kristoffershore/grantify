import ICreateUserPermissionsDTO from '../../../../dtos/ICreateUserPermissionsDTO';
import UserPermissionAssociation from '../../entities/UserPermissionAssociation';

export default interface IUserPermissionsAssnRepository {
  findById(id: string): Promise<UserPermissionAssociation | undefined>;
  findAllByPermissionTypeId(id: number): Promise<UserPermissionAssociation[]>;
  findAllByUserId(id: string): Promise<UserPermissionAssociation[]>;
  create(data: ICreateUserPermissionsDTO): Promise<UserPermissionAssociation>;
  save(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation>;
  delete(
    userPermissions: UserPermissionAssociation,
  ): Promise<UserPermissionAssociation>;
}
