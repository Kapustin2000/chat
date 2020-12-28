import Mongoose from 'mongoose';
import { MessageRepository } from 'src/modules/chat/repositories/messageRepository';


const ChatSchema = new Mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    members: [{
       type: Mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
    }],
    messages: {
        type: Array,
        // required: true
    },
    chat_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'ChatType',
    },
});

ChatSchema.methods.privateMessageTo = async function (to_user_id) {
    io.sockets.sockets.forEach(item => {
        if(item.user_id.toString() === to_user_id) {
            io.to(item.id).emit('MESSAGE', this);
            return false
        }
    });
};

const Chat = Mongoose.model('Chat', ChatSchema);

export { Chat };
