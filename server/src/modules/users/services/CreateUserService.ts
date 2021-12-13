import { inject, injectable } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';
import AppError from '../../../common/errors/AppError';
import User from '../infra/db/entities/User';

interface IRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    firstName,
    lastName,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
