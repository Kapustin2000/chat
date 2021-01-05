import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const JoinMiddleware = async (req, res, next) => {
    return await Repository.find(req.payload.user._id)
        .then(chat => {
            console.log(chat);
            if(chat) {
                return res.status(200).json(chat);
            }

            return next();
    }).catch(err => {
            throw err;
    });
};


export { JoinMiddleware };
