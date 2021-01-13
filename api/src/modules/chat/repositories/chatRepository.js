import { Chat } from 'src/modules/chat/models/chat.model';
import { ChatType } from 'src/modules/chat-type/chat.type.model';

const ChatRepository = {
     async find(user_id) {
        return  await Chat.findOne({
            members: {
                $in: [user_id]
            },
            // $or: [
            //     {
            //         members: {
            //             $in: [user_id]
            //         },
            //         type: ChatType.findGeneralTypeID()
            //     },
            //     {
            //         members: {
            //             $in: [user_id]
            //         },
            //         type: ChatType.findAdminTypeID()
            //     }
            // ]
        }).populate('members', ['_id','name', 'email']);
    },

    async general() {
        return  await Chat.findOne({
            $expr: {
                $lt:[{$size:"$members"}, 5]
            },
            type: await ChatType.findGeneralTypeID()
        });
    }
};

export { ChatRepository };
