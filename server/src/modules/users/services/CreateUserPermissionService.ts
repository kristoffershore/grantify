import { inject, injectable } from 'tsyringe';

import IPermissionsRepository from '../infra/db/repositories/interfaces/IPermissionsRepository';
import IUserPermissionsAssnRepository from '../infra/db/repositories/interfaces/IUserPermissionsAssnRepository';
import UserPermissionAssociation from '../infra/db/entities/UserPermissionAssociation';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  userId: string;
  displayName: string;
}

@injectable()
class CreateUserPermissionService {
  constructor(
    @inject('UserPermissionsAssnRepository')
    private userPermissionsRepository: IUserPermissionsAssnRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    displayName,
  }: IRequest): Promise<UserPermissionAssociation> {
    const checkIfPermissionExists =
      await this.permissionsRepository.findByDisplayName(displayName);

    if (!checkIfPermissionExists) {
      throw new AppError(
        'A permission with the given display name does not exist. Please create it before trying to create an association.',
      );
    }

    const checkIfUserExists = await this.usersRepository.findById(userId);

    if (!checkIfUserExists) {
      throw new AppError('User id provided does not exist.');
    }

    const allWithUserId = await this.userPermissionsRepository.findAllByUserId(
      checkIfUserExists.id,
    );
    const allWithPermissionTypeId =
      await this.userPermissionsRepository.findAllByPermissionTypeId(
        checkIfPermissionExists.id,
      );

    const userPermissionSet = new Set<UserPermissionAssociation>();

    allWithUserId.forEach(up => userPermissionSet.add(up));
    allWithPermissionTypeId.forEach(up => userPermissionSet.add(up));

    userPermissionSet.forEach(item => {
      if (
        item.permissionTypeId === checkIfPermissionExists.id &&
        item.userId === userId
      ) {
        throw new AppError('This association already exists');
      }
    });

    const association = await this.userPermissionsRepository.create({
      userId,
      permissionTypeId: checkIfPermissionExists.id,
    });

    return association;
  }
}

export default CreateUserPermissionService;
