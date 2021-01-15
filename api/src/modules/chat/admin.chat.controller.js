import Express from 'express';

import { MessageService } from 'src/modules/chat/services/messageService';
import { AdminChatRepository as Repository } from 'src/modules/chat/repositories/adminChatRepository';
import { decrypt } from 'src/config/encryption';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.all()
        .then(chats => {
            return res.json(chats)
        })
        .catch(next)
});




router.get('/:chat', (req, res, next) => {
    return Repository.find(req.params.chat).then(chat => {
        console.log(chat);
        io.joinRoom(req.payload.user._id, chat._id);
        chat.loadMessages().then(messages => {
            chat.messages = messages;

            return res.json(chat);
        });
    }).catch(err => {
        throw err;
    });
});


router.post('/:chat', (req, res, next) => {
    Repository.find(req.params.chat)
        .then(chat => {
            return MessageService.send({
                user_id: req.payload.user._id,
                chat_id: chat._id,
                text: req.body.text
            }).then(message => {
                message.text = decrypt(message.text);
                message.newMessageEvent();
                return res.json(message);
            }).catch(err => {
                throw err;
            });
        })
        .catch(next);
});

export { router as ChatController };
