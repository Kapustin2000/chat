import Mongoose from 'mongoose';

const ChatTypeSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const ChatType = Mongoose.model('ChatType', ChatTypeSchema);

ChatType.findAdminTypeID = async () => {
    return await ChatType.findOne({
        name: "Admin"
    })._id;
};

ChatType.findGeneralTypeID = async () => {
    return await ChatType.findOne({
        name: "General"
    })._id;
};

export { ChatType };
