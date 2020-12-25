import Mongoose from 'mongoose';

const MessageSchema = new Mongoose.Schema({
    text: {
        type: String,
        // required: true
    },
    chat_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

MessageSchema.methods.newMessageEvent = async function (chat) {
    io.socket.to(chat).to(this.chat_id).emit('MESSAGE', this);
};

const Message = Mongoose.model('Message', MessageSchema);




export { Message };
