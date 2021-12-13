import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionService from '../../../services/CreatePermissionService';
import ListPermissionsService from '../../../services/ListPermissionsService';

export default class PermissionsController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listPermissions = container.resolve(ListPermissionsService);

    const permissions = await listPermissions.execute();

    return response.json(permissions);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { displayName } = request.body;

    const createPermission = container.resolve(CreatePermissionService);

    const permission = await createPermission.execute({
      displayName,
    });

    return response.json(permission);
  }
}
