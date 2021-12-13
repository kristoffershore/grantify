import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: '123123',
    });

    await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@example.com',
      password: '123123456',
    });

    const users = await listUsers.execute();

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: expect.stringMatching('John'),
        }),
      ]),
    );
    expect(users).toHaveLength(2);
  });
});
