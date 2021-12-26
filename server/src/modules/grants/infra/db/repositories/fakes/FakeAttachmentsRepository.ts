import { v4 as uuid } from 'uuid';
import ICreateAttachmentDTO from '../../../../dtos/ICreateAttachmentDTO';
import ICreateExpenseDTO from '../../../../dtos/ICreateExpenseDTO';
import Attachment from '../../entities/Attachment';
import Expense from '../../entities/Expense';
import IAttachmentsRepository from '../interfaces/IAttachmentsRepository';

export default class FakeAttachmentsRepository
  implements IAttachmentsRepository
{
  private attachments: Attachment[] = [];

  public async findById(id: string): Promise<Attachment | undefined> {
    const findAttachment = this.attachments.find(
      attachment => attachment.id === id,
    );

    return findAttachment;
  }

  public async findAllByGrantId(id: string): Promise<Attachment[]> {
    return this.attachments.filter(a => a.grantId === id);
  }

  public async create(
    attachmentData: ICreateAttachmentDTO,
  ): Promise<Attachment> {
    const attachment = new Attachment();

    Object.assign(attachment, { id: uuid() }, attachmentData);

    this.attachments.push(attachment);

    return attachment;
  }

  public async save(attachment: Attachment): Promise<Attachment> {
    const findIndex = this.attachments.findIndex(
      findAttachment => findAttachment.id === attachment.id,
    );

    this.attachments[findIndex] = attachment;

    return attachment;
  }

  public async delete(attachment: Attachment): Promise<Attachment> {
    const findAttachment = attachment;

    this.attachments = this.attachments.filter(a => a.id !== attachment.id);

    return findAttachment;
  }
}
