import Express from 'express';

import { ChatService as Service } from 'src/modules/chat/services/chatService';
import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';
import { JoinMiddleware } from 'src/modules/chat/middlewares/join.middleware';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(chat => res.json(chat))
        .catch(next)
});

router.get('/all', () => {
    console.log('for admin');
});

router.post('/join', [ JoinMiddleware, (req, res, next) => {
    Service
        .join({
            type: req.body.type,
            user_id: req.payload.user._id
        })
        .then(data => res.json(data))
        .catch(next)
}]);

export { router as ChatController };
