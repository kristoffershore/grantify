import { inject, injectable } from 'tsyringe';
import AppError from '../../../common/errors/AppError';
import User from '../infra/db/entities/User';

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
