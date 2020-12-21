import { Chat } from 'src/modules/chat/chat.model';

const ChatRepository = {
    async get(user_id) {
        return  await Chat.find({
            members: {
                $in: [user_id]
            }
        }).limit(1);
    },
};

export { ChatRepository };
