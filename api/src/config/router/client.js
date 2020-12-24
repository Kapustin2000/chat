import Express from 'express';
import { ChatController } from 'src/modules/chat/client.chat.controller';


const ClientRouter = new Express.Router();

ClientRouter.use('/chat',  ChatController);

export { ClientRouter };
