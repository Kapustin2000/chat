import Mongoose from 'mongoose';
import { MessageRepository } from 'src/modules/chat/repositories/messageRepository';
import { decrypt } from 'src/config/encryption';


const ChatSchema = new Mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    members: [{
       type: Mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
    }],
    messages: {
        type: Array,
        // required: true
    },
    type: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'ChatType',
    }],
});

ChatSchema.methods.loadMessages = async function () {
    return await MessageRepository.all(this._id).then(messages => {
        return messages.map(message => {
            message.text = decrypt(message.text);
            return message;
        });
    })
};

const Chat = Mongoose.model('Chat', ChatSchema);

export { Chat };
