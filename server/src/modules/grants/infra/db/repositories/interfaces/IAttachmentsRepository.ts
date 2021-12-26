import ICreateAttachmentDTO from '../../../../dtos/ICreateAttachmentDTO';
import Attachment from '../../entities/Attachment';

export default interface IAttachmentsRepository {
  findById(id: string): Promise<Attachment | undefined>;
  findAllByGrantId(id: string): Promise<Attachment[]>;
  create(data: ICreateAttachmentDTO): Promise<Attachment>;
  save(grant: Attachment): Promise<Attachment>;
  delete(grant: Attachment): Promise<Attachment>;
}
