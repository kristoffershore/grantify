import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import AppError from '../../../common/errors/AppError';
import IAttachmentsRepository from '../infra/db/repositories/interfaces/IAttachmentsRepository';
import Attachment from '../infra/db/entities/Attachment';

interface IRequest {
  name: string;
  link: string;
  grantId: string;
}

@injectable()
export default class CreateAttachmentService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,

    @inject('AttachmentsRepository')
    private attachmentsRepository: IAttachmentsRepository,
  ) {}

  public async execute({
    name,
    link,
    grantId,
  }: IRequest): Promise<Attachment | undefined> {
    const checkIfAttachmentExists = await this.grantsRepository.findById(
      grantId,
    );

    if (!checkIfAttachmentExists) {
      throw new AppError('A grant with the id provided does not exist.');
    }

    const attachment = await this.attachmentsRepository.create({
      name,
      link,
      grantId,
    });

    return attachment;
  }
}
