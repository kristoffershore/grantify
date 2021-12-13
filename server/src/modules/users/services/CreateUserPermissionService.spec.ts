import AppError from '../../../common/errors/AppError';
import FakePermissionsRepository from '../infra/db/repositories/fakes/FakePermissionsRepository';
import FakeUserPermissionsRepository from '../infra/db/repositories/fakes/FakeUserPermissionsRepository';
import FakeUsersRepository from '../infra/db/repositories/fakes/FakeUsersRepository';

import CreateUserPermissionService from './CreateUserPermissionService';

let fakeUserPermissionsRepository: FakeUserPermissionsRepository;
let fakePermissionsRepository: FakePermissionsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createUserPermission: CreateUserPermissionService;

describe('CreateUserPermission', () => {
  beforeEach(() => {
    fakeUserPermissionsRepository = new FakeUserPermissionsRepository();
    fakePermissionsRepository = new FakePermissionsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createUserPermission = new CreateUserPermissionService(
      fakeUserPermissionsRepository,
      fakePermissionsRepository,
      fakeUsersRepository,
    );
  });

  // it('should be able to create a new user-permission association', async () => {
  //   const user = await fakeUsersRepository.create({
  //     firstName: 'Barry',
  //     lastName: 'Allen',
  //     email: 'ballen@starlabs.com',
  //     password: '123123123',
  //   });

  //   const permission = await fakePermissionsRepository.create({
  //     displayName: 'viewGrant',
  //   });

  //   const userPermission = await createUserPermission.execute({
  //     userId: user.id,
  //     displayName: permission.displayName,
  //   });

  //   expect(userPermission).toHaveProperty('id');
  //   expect(userPermission.userId).toBe(user.id);
  // });

  // it('should not be able to create a new permission with a display name that does not exist', async () => {
  //   const user = await fakeUsersRepository.create({
  //     firstName: 'Barry',
  //     lastName: 'Allen',
  //     email: 'ballen@starlabs.com',
  //     password: '123123123',
  //   });

  //   await expect(
  //     createUserPermission.execute({
  //       userId: user.id,
  //       displayName: 'non-existent display name',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });

  it('should not be able to create a new permission with an invalid user id', async () => {
    const permission = await fakePermissionsRepository.create({
      displayName: 'viewGrant',
    });

    await expect(
      createUserPermission.execute({
        userId: 'invalid user id',
        displayName: permission.displayName,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
