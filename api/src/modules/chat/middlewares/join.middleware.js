import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const JoinMiddleware = function (req, res, next) {
    Repository.find(req.payload.user._id)
        .then(chat => {
            if(chat) {
                return res.json(chat)
            }

            return next();
        })
        .catch(err => {
            throw err;
        });
};


export { JoinMiddleware };
