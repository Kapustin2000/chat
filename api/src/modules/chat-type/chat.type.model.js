import Mongoose from 'mongoose';

const ChatTypeSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const ChatType = Mongoose.model('ChatType', ChatTypeSchema);

ChatType.findAdminTypeID = () => {
    return ChatType.findOne({
        name: "Admin"
    }).then(type => {
        return type._id;
    });
};

ChatType.findGeneralTypeID = () => {
    return ChatType.findOne({
        name: "General"
    }).then(type => {
        return type._id;
    });
};

export { ChatType };
