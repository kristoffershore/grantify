import { inject, injectable } from 'tsyringe';
import AppError from '../../../common/errors/AppError';
import UserPermissionAssociation from '../infra/db/entities/UserPermissionAssociation';
import IUserPermissionsAssnRepository from '../infra/db/repositories/interfaces/IUserPermissionsAssnRepository';

interface IRequest {
  associationId: string;
}

@injectable()
export default class ShowUserPermissionService {
  constructor(
    @inject('UserPermissionsAssnRepository')
    private userPermissionsRepository: IUserPermissionsAssnRepository,
  ) {}
  public async execute({
    associationId,
  }: IRequest): Promise<UserPermissionAssociation | undefined> {
    const userPermission = await this.userPermissionsRepository.findById(
      associationId,
    );

    if (!userPermission) {
      throw new AppError('Association specified could not be retrieved.');
    }

    return userPermission;
  }
}
