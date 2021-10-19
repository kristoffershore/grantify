import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import GrantsController from '../controllers/GrantsController';

const grantsRouter = Router();
const grantsController = new GrantsController();

grantsRouter.get('/', grantsController.index);
grantsRouter.get('/:id', grantsController.show);
grantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      grantName: Joi.string().required(),
      openDate: Joi.date().required(),
      closeDate: Joi.date().required(),
      status: Joi.string().required(),
      amountRequested: Joi.number().required(),
      amountApproved: Joi.number().required(),
      sponsorName: Joi.string(),
      sponsorUrl: Joi.string(),
    },
  }),
  grantsController.create,
);

grantsRouter.put('/:id', grantsController.update);
grantsRouter.delete('/:id', grantsController.destroy);

export default grantsRouter;
