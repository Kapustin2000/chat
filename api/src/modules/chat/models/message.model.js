import Mongoose from 'mongoose';

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

MessageSchema.methods.newMessageEvent = async () => {
    console.log("message to chat" + this.chat_id);
    return io.socket.to(this.chat_id).emit('MESSAGE', this);
};

const Message = Mongoose.model('Message', MessageSchema);

export { Message };
