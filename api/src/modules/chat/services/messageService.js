// import { JoinValidation } from 'src/modules/chat/services/validator';
import { Message } from 'src/modules/chat/models/message.model';
import { encrypt } from 'src/config/encryption';

const MessageService = {
    async send(data) {
       //
       // const { error } = JoinValidation(data);
       //
       // if( error ) {
       //     throw error.details[0].message;
       // }

       const { text, user_id, chat_id } = data;

       return await Message.create({
           text: encrypt(text),
           user: user_id,
           chat_id: chat_id
       }).then(message => message.populate('user', ['_id', 'name', 'email']).execPopulate());
    },
};

export { MessageService };
