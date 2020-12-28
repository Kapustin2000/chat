import { JoinValidation } from 'src/modules/chat/services/validator';
import { Chat } from 'src/modules/chat/models/chat.model';
import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';

const joinGeneral = (user_id) => {
    return Repository.general()
        .then(chat => {
            return chat.update(
                {
                    $addToSet: { members: [ user_id ]}
                }
            )
        }).catch(() => {
            return Chat.create({
                type: Chat.findGeneralTypeID(),
                members: [user_id]
            }).then(chat => {
                return chat;
            });
        });
};

const joinAdmin = (user_id) => {
    return Chat.create({
        type: Chat.findAdminTypeID(),
        members: [user_id]
    }).then(chat => {
        return chat;
    });
};

const ChatService = {
    async join(data) {

       const { error } = JoinValidation(data);

       if( error ) {
           throw error.details[0].message;
       }

       const { type, user_id } = data;

       if(type === Chat.findAdminTypeID()) {
           joinAdmin(user_id)
       }

       return joinGeneral(user_id);

    },
};

export { ChatService , joinGeneral, joinAdmin };
