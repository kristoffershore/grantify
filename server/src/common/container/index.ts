import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/db/repositories/UsersRepository';
import IUsersRepository from '@modules/users/infra/db/repositories/interfaces/IUsersRepository';

import UserTokensRepository from '@modules/users/infra/db/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/users/infra/db/repositories/interfaces/IUserTokensRepository';
import IGrantsRepository from '@modules/grants/infra/db/repositories/interfaces/IGrantsRepository';
import GrantsRepository from '@modules/grants/infra/db/repositories/GrantsRepository';

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
