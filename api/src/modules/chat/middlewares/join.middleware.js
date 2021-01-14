import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const JoinMiddleware = async (req, res, next) => {
    return await Repository.find(req.payload.user._id)
        .then(chat => {
            if(chat) {
                io.joinRoom(req.payload.user._id, chat._id);
                return chat.loadMessages().then(messages => {
                    // console.log(messages);
                    chat.messages = messages;

                    return res.json(chat);
                });
            }

            return next();
    }).catch(err => {
        console.log(err);
            throw err;
    });
};


export { JoinMiddleware };
