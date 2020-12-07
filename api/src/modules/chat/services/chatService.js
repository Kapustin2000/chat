import { Message } from 'src/modules/chat/message.model';

const ChatService = {
    async save(data) {
        const { text, from_user_id, to_user_id } = data;

        let message = new Message({
            text: text,
            from_user_id: from_user_id,
            to_user_id: to_user_id
        });

        message = await message.save();

        message.privateMessageTo(to_user_id);

        return message;
    },
};

export { ChatService };
