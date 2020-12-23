import Express from 'express';

const router = new Express.Router();

/** Controllers **/
import { AuthController } from 'src/modules/auth/auth.controller';
import { ChatController } from 'src/modules/chat/chat.controller';



/** Middlewares **/
import { AuthMiddleware } from 'src/modules/auth/middlewares/auth.middleware';

router.use('/auth', AuthController);

router.use('/chat', [AuthMiddleware, ChatController]);

router.use('/user', [AuthMiddleware, async (req, res, next) => {
    res.json(req.payload.user);
}]);

export { router };
