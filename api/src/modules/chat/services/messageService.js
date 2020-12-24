import { JoinValidation } from 'src/modules/chat/services/validator';
import { Message } from 'src/modules/chat/message.model';


const MessageService = {
    async send(data) {

       const { error } = JoinValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

       const { text, user_id, chat_id } = data;

       return await Message.create({
           text: text,
           user_id: user_id,
           chat_id: chat_id
       });
    },
};

export { MessageService };
