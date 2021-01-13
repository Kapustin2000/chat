import { Chat } from 'src/modules/chat/models/chat.model';

const ChatRepository = {
    async all() {
        return  await Chat.find().populate('members', ['_id','name', 'email']);
    },

    async find(chat_id) {
        return  await Chat.findOne({
            _id: chat_id
        }).populate('members', ['_id','name', 'email']);
    }
};

export { ChatRepository as AdminChatRepository};
