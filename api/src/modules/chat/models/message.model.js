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

MessageSchema.methods.newMessageEvent = async function () {
    console.log(io.findRoom(this.chat_id.toString()), "from message", io.findRoomSize(this.chat_id.toString()));
    return io.socket.to(this.chat_id.toString()).emit('MESSAGE', this);
};

const Message = Mongoose.model('Message', MessageSchema);

export { Message };
