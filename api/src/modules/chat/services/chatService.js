import { JoinValidation } from 'src/modules/chat/services/validator';
import { Chat } from 'src/modules/chat/models/chat.model';
import { ChatType } from 'src/modules/chat-type/chat.type.model';
import { ChatRepository as Repository } from 'src/modules/chat/repositories/chatRepository';
import { UserRepository } from 'src/modules/user/repositories/userRepository';


const joinGeneral = async (user_id) => {
    return Repository.general()
        .then(chat => {
            let chatId = chat._id;
            return chat.updateOne(
                {
                    $addToSet: { members: [ user_id ]}
                }
            ).then(() => {
                return Chat.findOne({_id: chatId}).then(chat => { return chat;});
            });
        }).catch(() => {
            return Chat.create({
                type: ChatType.findGeneralTypeID().then(type => { return type; }),
                members: [
                    user_id
                ]
            }).then(chat => {
                return chat;
            });
        });
};

const joinAdmin = (user_id) => {
    return Chat.create({
        type:  ChatType.findAdminTypeID().then(type => { return type; }),
        members: [
            user_id,
            UserRepository.admin().then(user => { return user._id })
        ]
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

       if(type.toString() === (await ChatType.findAdminTypeID()).toString()) {
           return joinAdmin(user_id)
       }

       return joinGeneral(user_id);

    },
};

export { ChatService , joinGeneral, joinAdmin };
