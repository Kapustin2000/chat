import Mongoose from 'mongoose';

const MessageSchema = new Mongoose.Schema({
   text: {
       type: String,
       required: true
   },
   from_user_id: {
       type: String,
       required: true
   },
   to_user_id: {
       type: String,
       required: true
   }
});

MessageSchema.methods.privateMessageTo = async function (to_user_id) {
    io.sockets.sockets.forEach(item => {
        if(item.user_id.toString() === to_user_id) {
            io.to(item.id).emit('MESSAGE', this);
            return false
        }
    });
};

const Message = Mongoose.model('Message', MessageSchema);

export { Message };
