import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ensureAuthenticated from '../../../../../common/infra/http/middlewares/ensureAuthenticated';
import { can } from '../../../../../common/infra/http/middlewares/ensureAuthorized';
import UserPermissionsController from '../controllers/UserPermissionsController';

const userPermissionsRouter = Router();
const userPermissionsController = new UserPermissionsController();

userPermissionsRouter.use(ensureAuthenticated);

userPermissionsRouter.get(
  '/:id/user-permissions',
  can('editPermissions'),
  userPermissionsController.index,
);

userPermissionsRouter.post(
  '/:id/user-permissions',
  can('editPermissions'),
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
  can('editPermissions'),
  userPermissionsController.destroy,
);

export default userPermissionsRouter;
