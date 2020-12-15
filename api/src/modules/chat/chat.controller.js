import Express from 'express';

import { ChatService } from 'src/modules/chat/services/chatService';
import { ChatRepository  as Repository } from 'src/modules/chat/repositories/chatRepository';
import { findSocketByUserID } from 'src/config/helpers';


const router = Express.Router();

router.get('/', (req, res, next) => {
    console.log(io.sockets.adapter.rooms, 123);



    Repository.get(req.payload.user._id)
        .then(messages => res.json(messages))
        .catch(next);
});

router.post('/', (req, res, next) => {
    ChatService
        .save({
            from_user_id: req.payload.user.id,
            to_user_id: req.body.to_user_id,
            text: req.body.text
        })
        .then(data => res.json(data))
        .catch(next)
});

export { router as ChatController };
