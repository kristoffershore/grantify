import ICreatePermissionDTO from '../../../../dtos/ICreatePermissionDTO';
import PermissionType from '../../entities/PermissionType';

export default interface IPermissionsRepository {
  findByDisplayName(name: string): Promise<PermissionType | undefined>;
  findAll(): Promise<PermissionType[]>;
  create(data: ICreatePermissionDTO): Promise<PermissionType>;
  save(permission: PermissionType): Promise<PermissionType>;
}
