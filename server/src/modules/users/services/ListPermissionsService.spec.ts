import FakePermissionsRepository from '../infra/db/repositories/fakes/FakePermissionsRepository';
import ListPermissionsService from './ListPermissionsService';

let fakePermissionsRepository: FakePermissionsRepository;
let listPermissions: ListPermissionsService;

describe('ListPermissions', () => {
  beforeEach(() => {
    fakePermissionsRepository = new FakePermissionsRepository();

    listPermissions = new ListPermissionsService(fakePermissionsRepository);
  });

  it('should be able to list all permissions', async () => {
    await fakePermissionsRepository.create({
      displayName: 'viewGrant',
    });

    await fakePermissionsRepository.create({
      displayName: 'editGrant',
    });

    await fakePermissionsRepository.create({
      displayName: 'deleteGrant',
    });

    const permissions = await listPermissions.execute();

    expect(permissions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          displayName: expect.stringMatching('viewGrant'),
        }),
      ]),
    );
    expect(permissions).toHaveLength(3);
  });
});
