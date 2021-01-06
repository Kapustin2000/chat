import Express from 'express';

import { MessageService } from 'src/modules/chat/services/messageService';
import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.all()
        .then(chats => {
            return res.json(chats)
        })
        .catch(next)
});




router.get('/:chat', (req, res, next) => {
    Repository.find(req.params.chat)
        .then(chat => {
            io.socket.findByUserID(req.payload.user._id)
                .join(chat._id);
            chat.loadMessages();
            return res.json(chat)
        })
        .catch(next)
});


router.post('/:chat', (req, res, next) => {
    Repository.find(req.params.chat)
        .then(chat => {
            return MessageService.send({
                user: req.payload.user._id,
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

export { router as ChatController };
