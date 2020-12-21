import { JoinValidation } from 'src/modules/chat/services/validator';
import { Chat } from 'src/modules/chat/chat.model';

const ChatService = {
    async join(data) {

       const { error } = JoinValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

      console.log(data);
    },
};

export { ChatService };
