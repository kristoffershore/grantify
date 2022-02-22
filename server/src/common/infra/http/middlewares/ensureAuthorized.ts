import { NextFunction, Request, Response } from 'express';
import PermissionsRepository from '../../../../modules/users/infra/db/repositories/PermissionsRepository';
import UserPermissionsAssnRepository from '../../../../modules/users/infra/db/repositories/UserPermissionsAssnRepository';
import UsersRepository from '../../../../modules/users/infra/db/repositories/UsersRepository';
import AppError from '../../../errors/AppError';

export function can(permissionDisplayName: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const permissionsRepository = new PermissionsRepository();
    const userPermissionsAssnRepository = new UserPermissionsAssnRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist.', 401);
    }

    const permission = await permissionsRepository.findByDisplayName(
      permissionDisplayName,
    );

    if (!permission) {
      throw new AppError(
        'The permission display name does not correspond to any existing permission.',
      );
    }

    const userPermission =
      await userPermissionsAssnRepository.findByUserIdAndPermissionId(
        user.id,
        permission.id,
      );

    if (!userPermission) {
      throw new AppError(
        'User does not have permission to access the resource requested.',
        403,
      );
    }

    return next();
  };
}
