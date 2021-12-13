import { inject, injectable } from 'tsyringe';

import IUserPermissionsAssnRepository from '../infra/db/repositories/interfaces/IUserPermissionsAssnRepository';
import UserPermissionAssociation from '../infra/db/entities/UserPermissionAssociation';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  associationId: string;
}

@injectable()
class DeleteUserPermissionService {
  constructor(
    @inject('UserPermissionsAssnRepository')
    private userPermissionsRepository: IUserPermissionsAssnRepository,
  ) {}

  public async execute({
    associationId,
  }: IRequest): Promise<UserPermissionAssociation> {
    const userPermission = await this.userPermissionsRepository.findById(
      associationId,
    );

    if (!userPermission) {
      throw new AppError('The association specified does not exist.');
    }

    await this.userPermissionsRepository.delete(userPermission);

    return userPermission;
  }
}

export default DeleteUserPermissionService;
