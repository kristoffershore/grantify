import { inject, injectable } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';
import AppError from '../../../common/errors/AppError';
import User from '../infra/db/entities/User';

interface IRequest {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    first_name,
    last_name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('Email already in use.');
    }

    user.firstName = first_name;
    user.lastName = last_name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Please inform the old password to create a new one.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password is incorrect.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
