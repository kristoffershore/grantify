import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PermissionsController from '../controllers/PermissionsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.use(ensureAuthenticated);

permissionsRouter.get('/', permissionsController.index);

permissionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      displayName: Joi.string().required(),
    },
  }),
  permissionsController.create,
);

export default permissionsRouter;
