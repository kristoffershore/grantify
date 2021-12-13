import { inject, injectable } from 'tsyringe';
import User from '../infra/db/entities/User';
import IUsersRepository from '../infra/db/repositories/interfaces/IUsersRepository';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
}
