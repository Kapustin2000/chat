import Mongoose from 'mongoose';

const types =  [
    {
        id: 1,
        name: "Admin"
    },
    {
        id: 2,
        name: "General"
    },
];

const ChatSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {
       type: Array,
       required: true
   },
    messages: {
        type: Array,
        // required: true
    },
    type: {
        type: Number,
        min: 1
    }
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