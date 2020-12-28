import { Message } from 'src/modules/chat/models/message.model';

const MessageRepository = {
    async all(chat) {
        return  await Message.find({
            chat_id: chat
        });
    },
};

export { MessageRepository };
