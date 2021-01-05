import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const HasChatMiddleware = function (req, res, next) {
    Repository.find(req.payload.user._id)
        .then(chat => {
            if(chat && chat._id === req.params.chat) {
                return next()
            }

            throw 'You dont have this chat.';
        })
        .catch(err => {
            throw err;
        });
};


export { HasChatMiddleware };
