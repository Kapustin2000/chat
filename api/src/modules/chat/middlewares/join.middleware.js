import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const JoinMiddleware = function (req, res, next) {
    Repository.get(req.payload.user._id)
        .then(chat => res.json(chat))
        .catch(err => {
           next();
        });
};


export { JoinMiddleware };
