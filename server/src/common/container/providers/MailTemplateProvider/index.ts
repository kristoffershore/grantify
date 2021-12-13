import { container } from 'tsyringe';
import IMailTemplateProvider from '../MailTemplateProvider/interfaces/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
