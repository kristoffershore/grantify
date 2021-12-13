import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUserTokensRepository from '../infra/db/repositories/interfaces/IUserTokensRepository';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';
import AppError from '../../../common/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist.');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
