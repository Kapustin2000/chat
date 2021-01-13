import Mongoose from 'mongoose';
import { decrypt } from 'src/config/encryption';

const MessageSchema = new Mongoose.Schema({
    text: {
        type: Object,
        required: true
    },
    chat_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

MessageSchema.methods.newMessageEvent = async function () {
    return io.socket.to(this.chat_id.toString()).emit('MESSAGE', this);
};

const Message = Mongoose.model('Message', MessageSchema);

export { Message };
