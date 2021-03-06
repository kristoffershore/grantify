import { container } from 'tsyringe';

import mailConfig from '../../../../config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import IMailProvider from './interfaces/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  // ses: container.resolve(ESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
