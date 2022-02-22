import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ensureAuthenticated from '../../../../../common/infra/http/middlewares/ensureAuthenticated';
import AttachmentsController from '../controllers/AttachmentsController';

const attachmentsRouter = Router();
const attachmentsController = new AttachmentsController();

attachmentsRouter.use(ensureAuthenticated);

attachmentsRouter.get('/:grantId', attachmentsController.index);
attachmentsRouter.get('/:grantId/:attachmentId', attachmentsController.show);
attachmentsRouter.post(
  '/:grantId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      link: Joi.string().required(),
    },
  }),
  attachmentsController.create,
);
attachmentsRouter.delete(
  '/:grantId/:attachmentId',
  attachmentsController.destroy,
);

export default attachmentsRouter;
