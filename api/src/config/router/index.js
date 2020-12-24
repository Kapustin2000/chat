import Express from 'express';

/** Controllers **/
import { AuthController } from 'src/modules/auth/auth.controller';

/** Routers **/
import { AdminRouter } from 'src/config/router/admin';
import { ClientRouter } from 'src/config/router/client';

/** Middlewares **/
import { AuthMiddleware, ClientMiddleware, AdminMiddleware } from 'src/modules/auth/middlewares';


const router = new Express.Router();

router.use('/auth', AuthController);

router.use('/admin', [AuthMiddleware, AdminMiddleware, AdminRouter]);
router.use('/client', [AuthMiddleware, ClientMiddleware, ClientRouter]);


router.use('/user', [AuthMiddleware, async (req, res, next) => {
    res.json(req.payload.user);
}]);

export { router };
