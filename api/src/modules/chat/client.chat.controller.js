import Express from 'express';

import { ChatService as Service } from 'src/modules/chat/services/chatService';
import { MessageService } from 'src/modules/chat/services/messageService';

import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';
import { JoinMiddleware } from 'src/modules/chat/middlewares/join.middleware';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(chat => res.json(chat))
        .catch(next)
});

router.post('/', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(chat => {
            return MessageService.send({
                 user_id: req.payload.user._id,
                 chat_id: chat._id,
                 text: req.body.text
            }).then(message => {
                return message.newMessageEvent();
            }).catch(err => {
                throw err;
            });
        })
        .catch(next);
});


router.post('/join', [JoinMiddleware, (req, res, next) => {
    Service
        .join({
            type: req.body.type,
            user_id: req.payload.user._id
        })
        .then(data => res.json(data))
        .catch(next)
}]);

export { router as ChatController };
