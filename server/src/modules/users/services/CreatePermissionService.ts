import { inject, injectable } from 'tsyringe';

import IPermissionsRepository from '../infra/db/repositories/interfaces/IPermissionsRepository';
import PermissionType from '../infra/db/entities/PermissionType';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  displayName: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ displayName }: IRequest): Promise<PermissionType> {
    const checkIfPermissionExists =
      await this.permissionsRepository.findByDisplayName(displayName);

    if (checkIfPermissionExists) {
      throw new AppError(
        'A permission with the given display name already exists',
      );
    }

    const permission = await this.permissionsRepository.create({ displayName });

    return permission;
  }
}

export default CreatePermissionService;
