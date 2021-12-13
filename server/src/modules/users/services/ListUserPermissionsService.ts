import { inject, injectable } from 'tsyringe';
import UserPermissionAssociation from '../infra/db/entities/UserPermissionAssociation';
import IUserPermissionsAssnRepository from '../infra/db/repositories/interfaces/IUserPermissionsAssnRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ListUserPermissionsService {
  constructor(
    @inject('UserPermissionsAssnRepository')
    private userPermissionsRepository: IUserPermissionsAssnRepository,
  ) {}
  public async execute({
    userId,
  }: IRequest): Promise<UserPermissionAssociation[]> {
    return this.userPermissionsRepository.findAllByUserId(userId);
  }
}
