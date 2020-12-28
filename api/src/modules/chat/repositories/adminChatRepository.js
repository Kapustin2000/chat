import { Chat } from 'src/modules/chat/models/chat.model';

const ChatRepository = {
    async all() {
        return  await Chat.find();
    },

    async find(chat_id) {
        return  await Chat.findOne({
            _id: chat_id
        });
    }
};

export { ChatRepository };
