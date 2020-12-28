import Mongoose from 'mongoose';

const ChatTypeSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const ChatType = Mongoose.model('ChatType', ChatTypeSchema);


export { ChatType };
