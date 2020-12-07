import { Message } from 'src/modules/chat/message.model';

const ChatRepository = {
    async get(user_id) {
        return  await Message.find({
            user_id: user_id
        });
    },

    async find(id, user_id) {
        return await Message.find({
            _id: id,
            user_id: user_id
        });
    }
};

export { ChatRepository };
