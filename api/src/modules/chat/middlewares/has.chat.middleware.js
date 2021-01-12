import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const HasChatMiddleware = function (req, res, next) {
    return Repository.find(req.payload.user._id)
        .then(chat => {
            if(chat && chat._id === req.params.chat) {
                return next()
            }

            return res.status(500).json({
                message: "You dont have this chat."
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: err
            });
        });
};


export { HasChatMiddleware };
