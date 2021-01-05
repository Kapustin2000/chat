import { Chat } from 'src/modules/chat/models/chat.model';
import { ChatType } from 'src/modules/chat-type/chat.type.model';

const ChatRepository = {
     async find(user_id) {
        return  await Chat.findOne({
            $or: [
                {
                    members: {
                        $in: [user_id]
                    },
                    // type: ChatType.findGeneralTypeID()
                },
                {
                    members: {
                        $in: [user_id]
                    },
                    // type: ChatType.findAdminTypeID()
                }
            ]
        }).populate('members', ['_id','name', 'email']);
    },

    async general() {
        return  await Chat.find({
            members: {
                lt: 5
            },
        }).limit(1);
    }
};

export { ChatRepository };
