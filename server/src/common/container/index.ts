import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import IPermissionsRepository from '../../modules/users/infra/db/repositories/interfaces/IPermissionsRepository';
import PermissionsRepository from '../../modules/users/infra/db/repositories/PermissionsRepository';
import IUserPermissionsAssnRepository from '../../modules/users/infra/db/repositories/interfaces/IUserPermissionsAssnRepository';
import UserPermissionsAssnRepository from '../../modules/users/infra/db/repositories/UserPermissionsAssnRepository';
import GrantsRepository from '../../modules/grants/infra/db/repositories/GrantsRepository';
import IGrantsRepository from '../../modules/grants/infra/db/repositories/interfaces/IGrantsRepository';
import IUsersRepository from '../../modules/users/infra/db/repositories/interfaces/IUsersRepository';
import IUserTokensRepository from '../../modules/users/infra/db/repositories/interfaces/IUserTokensRepository';
import UsersRepository from '../../modules/users/infra/db/repositories/UsersRepository';
import UserTokensRepository from '../../modules/users/infra/db/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IGrantsRepository>(
  'GrantsRepository',
  GrantsRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IUserPermissionsAssnRepository>(
  'UserPermissionsAssnRepository',
  UserPermissionsAssnRepository,
);
