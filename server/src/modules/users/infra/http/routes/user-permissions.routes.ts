import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ensureAuthenticated from '../../../../../common/infra/http/middlewares/ensureAuthenticated';
import UserPermissionsController from '../controllers/UserPermissionsController';

const userPermissionsRouter = Router();
const userPermissionsController = new UserPermissionsController();

userPermissionsRouter.use(ensureAuthenticated);

userPermissionsRouter.get(
  '/:id/user-permissions',
  userPermissionsController.index,
);

userPermissionsRouter.post(
  '/:id/user-permissions',
  celebrate({
    [Segments.BODY]: {
      displayName: Joi.string().required(),
    },
  }),
  userPermissionsController.create,
);

userPermissionsRouter.get(
  '/:id/user-permissions/:associationId',
  userPermissionsController.show,
);

userPermissionsRouter.delete(
  '/:id/user-permissions/:associationId',
  userPermissionsController.destroy,
);

export default userPermissionsRouter;
