import AppError from '../../../common/errors/AppError';
import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an email that is already in use', async () => {
    await createUser.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'starlabs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
