import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/db/entities/User';
import AppError from '@common/errors/AppError';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
