import Express from 'express';

import { ChatService as Service } from 'src/modules/chat/services/chatService';
import { MessageService } from 'src/modules/chat/services/messageService';

import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';
import { JoinMiddleware } from 'src/modules/chat/middlewares/join.middleware';
import { HasChatMiddleware } from 'src/modules/chat/middlewares/has.chat.middleware';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(chat => {
            io.socket.findByUserID(req.payload.user._id)
                .join(chat._id);
            chat.loadMessages();
            res.json(chat)
        })
        .catch(next)
});

router.post('/:chat', [HasChatMiddleware, (req, res, next) => {
        return MessageService.send({
            user: req.payload.user._id,
            chat_id: req.params.chat,
            text: req.body.text
        }).then(message => {
            return message.newMessageEvent();
        }).catch(err => {
            throw err;
        });
}]);


router.post('/join', [JoinMiddleware, (req, res, next) => {
    Service
        .join({
            type: req.body.type,
            user_id: req.payload.user._id
        })
        .then(chat => {
            io.socket.findByUserID(req.payload.user._id)
                .join(chat._id);
            res.json(chat)
        })
        .catch(next)
}]);

export { router as ChatController };
