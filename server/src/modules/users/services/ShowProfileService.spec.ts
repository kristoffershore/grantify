import AppError from '@common/errors/AppError';

import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Barry Allen',
      email: 'ballen@starlabs.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('Barry Allen');
    expect(profile.email).toBe('ballen@starlabs.com');
  });

  it('should not be able to list the profile of a nonexistent user', async () => {
    await expect(
      showProfile.execute({
        userId: 'nonexistent user id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
