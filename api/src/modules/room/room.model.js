import Mongoose from 'mongoose';

const RoomSchema = new Mongoose.Schema({
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
});

RoomSchema.methods.privateMessageTo = async function (to_user_id) {
    io.sockets.sockets.forEach(item => {
        if(item.user_id.toString() === to_user_id) {
            io.to(item.id).emit('MESSAGE', this);
            return false
        }
    });
};

const Room = Mongoose.model('Room', RoomSchema);

export { Room };
