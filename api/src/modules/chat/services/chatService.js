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
                return Chat.findOne({_id: chatId})
                    .populate('members', ['_id','name', 'email'])
                    .then(chat => { return chat; })
            })
        }).catch(async () => {
            return Chat.create({
                type: await ChatType.findGeneralTypeID(),
                members: [
                    user_id
                ]
            }).then(chat => {
                let newChat = chat.populate('members', ['_id','name', 'email']).execPopulate();
                console.log(newChat);
                io.socket.to("admin").emit("NEW_CHAT", newChat);
                return newChat;
            });
        });
};

const joinAdmin = async (user_id) => {
    return await Chat.create({
        type: await ChatType.findAdminTypeID(),
        members: [
            user_id,
            await UserRepository.admin().then(user => { return user._id })
        ]
    }).then(chat => {
        let newChat = chat.populate('members', ['_id','name', 'email']).execPopulate();
        console.log(newChat);
        io.socket.to("admin").emit("NEW_CHAT", newChat);
        return newChat;
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
