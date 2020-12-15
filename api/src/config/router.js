import Express from 'express';

const router = new Express.Router();

/** Controllers **/
import { AuthController } from 'src/modules/auth/auth.controller';


/** Middlewares **/
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

router.get('/', (req, res) => {
    res.send("Hello world");
});

router.use('/auth', AuthController);

router.use('/user', [AuthMiddleware, (req, res, next) => {
    res.json(req.payload.user);
}]);

export { router };
