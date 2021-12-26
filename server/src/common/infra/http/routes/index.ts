import { Router } from 'express';
import attachmentsRouter from '../../../../modules/grants/infra/http/routes/attachments.routes';
import grantsRouter from '../../../../modules/grants/infra/http/routes/grants.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
import permissionsRouter from '../../../../modules/users/infra/http/routes/permissions.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
// import userPermissionsRouter from '../../../../modules/users/infra/http/routes/user-permissions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/password', passwordRouter);
router.use('/profile', profileRouter);
router.use('/grants', grantsRouter);
router.use('/attachments', attachmentsRouter);
router.use('/permissions', permissionsRouter);
// router.use('/users', userPermissionsRouter);

export default router;
