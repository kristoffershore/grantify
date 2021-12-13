import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import CreateUserPermissionService from '../../../services/CreateUserPermissionService';
import ListUserPermissionsService from '../../../services/ListUserPermissionsService';
import DeleteUserPermissionService from '../../../services/DeleteUserPermissionService';
import ShowUserPermissionService from '../../../services/ShowUserPermissionService';

export default class UserPermissionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUserPermissions = container.resolve(ListUserPermissionsService);

    const userPermissions = await listUserPermissions.execute({ userId: id });

    return response.json(userPermissions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id, associationId } = request.params;

    const showUserPermission = container.resolve(ShowUserPermissionService);

    const userPermission = await showUserPermission.execute({
      associationId,
    });

    return response.json(userPermission);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { displayName } = request.body;

    const createUserPermission = container.resolve(CreateUserPermissionService);

    const userPermission = await createUserPermission.execute({
      userId: id,
      displayName,
    });

    return response.json(classToClass(userPermission));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id, associationId } = request.params;

    const deleteUserPermission = container.resolve(DeleteUserPermissionService);

    const userPermission = await deleteUserPermission.execute({
      associationId,
    });

    return response.json(userPermission);
  }
}
