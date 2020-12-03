import Mongoose from 'mongoose';

const MessageSchema = new Mongoose.Schema({
   text: {
       type: String,
       required: true
   }
});

MessageSchema.methods.comparePassword = async function (pass) {
    // return await Bcrypt.compare(pass, this.password);
};

const Message = Mongoose.model('Message', MessageSchema);

export { Message };
