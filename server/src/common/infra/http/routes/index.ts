import { Router } from 'express';

import drinkRouter from '@modules/drinks/infra/http/routes/drink.routes';
import orderRoutes from '@modules/orders/infra/http/routes/order.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/menu', drinkRouter);
router.use('/orders', orderRoutes);
router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/profile', profileRouter);

export default router;
