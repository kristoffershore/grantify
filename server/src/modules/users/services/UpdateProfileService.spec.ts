import AppError from '../../../common/errors/AppError';
import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      first_name: 'Wally',
      last_name: 'West',
      email: 'wwest@starlabs.com',
    });

    expect(updatedUser.firstName).toBe('Wally');
    expect(updatedUser.email).toBe('wwest@starlabs.com');
  });

  it('should not be able to update the profile of a nonexistent user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'nonexistent user id',
        first_name: 'Test',
        last_name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to another user's email", async () => {
    await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'oqueen@queenindustries.com',
      password: '321321',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        first_name: 'Barry',
        last_name: 'Allen',
        email: 'ballen@starlabs.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      first_name: 'Oliver',
      last_name: 'Queen',
      email: 'oqueen@queenindustries.com',
      old_password: '123456',
      password: '321321',
    });

    expect(updatedUser.password).toBe('321321');
  });

  it('should not be able to update password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        first_name: 'Oliver',
        last_name: 'Queen',
        email: 'oqueen@queenindustries.com',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with the incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      firstName: 'Barry',
      lastName: 'Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        first_name: 'Oliver',
        last_name: 'Queen',
        email: 'oqueen@queenindustries.com',
        old_password: 'wrong-pw',
        password: '321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
