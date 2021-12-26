import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import GrantsController from '../controllers/GrantsController';
import ensureAuthenticated from '../../../../../common/infra/http/middlewares/ensureAuthenticated';
import ExpensesController from '../controllers/ExpensesController';

const grantsRouter = Router();
const grantsController = new GrantsController();
const expensesController = new ExpensesController();

grantsRouter.use(ensureAuthenticated);

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
      amountApproved: Joi.number(),
      sponsorName: Joi.string(),
      sponsorUrl: Joi.string(),
      dateWhenFundsWereReceived: Joi.date(),
      expirationDate: Joi.date(),
    },
  }),
  grantsController.create,
);

grantsRouter.put('/:id', grantsController.update);
grantsRouter.delete('/:id', grantsController.destroy);

// expense routes
grantsRouter.get('/view/:grantId', expensesController.index);
grantsRouter.get('/view/:grantId/:expenseId', expensesController.show);
grantsRouter.post(
  '/view/:grantId',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      amount: Joi.number().required(),
    },
  }),
  expensesController.create,
);
grantsRouter.delete('/view/:grantId/:expenseId', expensesController.destroy);

export default grantsRouter;
