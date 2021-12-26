import { inject, injectable } from 'tsyringe';

import IGrantsRepository from '../infra/db/repositories/interfaces/IGrantsRepository';
import AppError from '../../../common/errors/AppError';
import IAttachmentsRepository from '../infra/db/repositories/interfaces/IAttachmentsRepository';
import Attachment from '../infra/db/entities/Attachment';

interface IRequest {
  id: string;
}

@injectable()
export default class ShowAttachmentService {
  constructor(
    @inject('GrantsRepository')
    private grantsRepository: IGrantsRepository,

    @inject('AttachmentsRepository')
    private attachmentsRepository: IAttachmentsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Attachment | undefined> {
    const attachment = await this.attachmentsRepository.findById(id);

    if (!attachment) {
      throw new AppError('An attachment with the given id does not exist.');
    }

    return attachment;
  }
}
