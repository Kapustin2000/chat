import Express from 'express';

import { ChatService as Service } from 'src/modules/chat/services/joinService';
import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(chat => res.json(chat))
        .catch(next)
});

router.get('/all', () => {
    console.log('for admin');
});

router.post('/join', (req, res, next) => {
    Service
        .join(req.body)
        .then(data => res.json(data))
        .catch(next)
});

export { router as ChatController };
