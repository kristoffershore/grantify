import { v4 as uuid } from 'uuid';
import AppError from '../../../common/errors/AppError';
import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUser: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUser = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show a user', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@starlabs.com',
      password: '123456789',
    });

    const userRetrieved = await showUser.execute({ userId: user.id });
    expect(userRetrieved).toHaveProperty('firstName');
    expect(userRetrieved?.lastName).toBe('Allen');
  });

  it('should not be able to show a nonexistent user', async () => {
    await expect(
      showUser.execute({
        userId: 'nonexistent workforce id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
