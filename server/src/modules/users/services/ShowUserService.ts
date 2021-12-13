import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';
import User from '../infra/db/entities/User';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  userId: string;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('The user provided does not exist');
    }

    return user;
  }
}

export default ShowUserService;
