import Express from 'express';
import { ChatController } from 'src/modules/chat/admin.chat.controller';


const AdminRouter = new Express.Router();

AdminRouter.use('/chat',  ChatController);

export { AdminRouter };
