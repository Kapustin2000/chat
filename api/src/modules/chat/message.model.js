import Mongoose from 'mongoose';

const MessageSchema = new Mongoose.Schema({
    text: {
        type: String,
        // required: true
    },
    chat_id: {
        type: String,
        // required: true
    },
    user_id: {
        type: String,
        // required: true
    }
});

MessageSchema.methods.newMessageEvent = async function (chat) {
        // io.sockets.sockets.forEach(item => {
        //     if(item.user_id.toString() === to_user_id) {
        //         io.to(item.id).emit('MESSAGE', this);
        //         return false
        //     }
        // });
        console.log(this);
        io.socket.to(chat).to(this.chat_id).emit('MESSAGE', this);
};

const Message = Mongoose.model('Message', MessageSchema);




export { Message };
