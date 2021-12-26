import IAttachmentsRepository from './interfaces/IAttachmentsRepository';
import Attachment from '../entities/Attachment';
import { getRepository, Repository } from 'typeorm';
import ICreateAttachmentDTO from '../../../dtos/ICreateAttachmentDTO';

export default class AttachmentsRepository implements IAttachmentsRepository {
  private ormRepository: Repository<Attachment>;

  constructor() {
    this.ormRepository = getRepository(Attachment);
  }

  public async findById(id: string): Promise<Attachment | undefined> {
    const attachment = await this.ormRepository.findOne(id);

    return attachment;
  }

  public async findAllByGrantId(id: string): Promise<Attachment[]> {
    const attachments = await this.ormRepository.find({
      where: { grantId: id },
    });

    return attachments;
  }

  public async create(
    attachmentData: ICreateAttachmentDTO,
  ): Promise<Attachment> {
    const attachment = this.ormRepository.create(attachmentData);

    await this.ormRepository.save(attachment);

    return attachment;
  }

  public async save(attachment: Attachment): Promise<Attachment> {
    return this.ormRepository.save(attachment);
  }

  public async delete(attachment: Attachment): Promise<Attachment> {
    return this.ormRepository.remove(attachment);
  }
}
