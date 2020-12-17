import Mongoose from 'mongoose';

const LobbySchema = new Mongoose.Schema({
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

const Lobby = Mongoose.model('Lobby', LobbySchema);

export { Lobby };
