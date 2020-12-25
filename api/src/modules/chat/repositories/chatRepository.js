import { Chat } from 'src/modules/chat/chat.model';

const ChatRepository = {
     async find(user_id) {
        return  await Chat.findOne({
            $or: [
                {
                    members: {
                        $in: [user_id]
                    },
                    type: Chat.findGeneralTypeID()
                },
                {
                    members: {
                        $in: [user_id]
                    },
                    type: Chat.findAdminTypeID()
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
