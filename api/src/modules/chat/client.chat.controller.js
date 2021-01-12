import Express from 'express';

import { ChatService as Service } from 'src/modules/chat/services/chatService';
import { MessageService } from 'src/modules/chat/services/messageService';

import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';
import { JoinMiddleware } from 'src/modules/chat/middlewares/join.middleware';
import { HasChatMiddleware } from 'src/modules/chat/middlewares/has.chat.middleware';
import { decrypt } from 'src/config/encryption';


const router = Express.Router();


router.get('/', (req, res, next) => {
    return Repository.find(req.payload.user._id).then(chat => {
        io.joinRoom(req.payload.user._id, chat._id);
        chat.loadMessages().then(messages => {
            // console.log(messages);
            chat.messages = messages;

            return res.json(chat);
        });
    }).catch(err => {
        throw err;
    });
});

router.post('/join',
    JoinMiddleware,
    (req, res) => {
    return Service
        .join({
            type: req.body.type,
            user_id: req.payload.user._id
        })
        .then(chat => {
            io.joinRoom(req.payload.user._id, chat._id);
            return chat.loadMessages().then(messages => {
                // console.log(messages);
                chat.messages = messages;

                return res.json(chat);
            }).catch(() => {
                return res.json(chat);
            });
        })
        .catch(err => {
            return res.status(500).json(err)
        })
}
);


router.post('/:chat', [
    HasChatMiddleware,
    (req, res, next) => {
        return MessageService.send({
            user: req.payload.user._id,
            chat_id: req.params.chat,
            text: req.body.text
        }).then(message => {
            message.text = decrypt(message.text);
            message.newMessageEvent();
            return res.json(message);
        }).catch(err => {
            throw err;
        });
}]);

export { router as ChatController };
