import AppError from '../../../common/errors/AppError';
import FakePermissionsRepository from '../infra/db/repositories/fakes/FakePermissionsRepository';

import CreatePermissionService from './CreatePermissionService';

let fakePermissionsRepository: FakePermissionsRepository;
let createPermission: CreatePermissionService;

describe('CreatePermission', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();

    createPermission = new CreatePermissionService(fakePermissionsRepository);
  });

  it('should be able to create a new permission', async () => {
    const permission = await createPermission.execute({
      displayName: 'viewGrant',
    });

    expect(permission).toHaveProperty('id');
  });

  it('should not be able to create a new permission with a display name that is already in use', async () => {
    await createPermission.execute({
      displayName: 'viewGrant',
    });

    await expect(
      createPermission.execute({
        displayName: 'viewGrant',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
