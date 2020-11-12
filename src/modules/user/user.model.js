import Mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

const UserSchema = new Mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   email: {
       type: String,
       unique: true,
       required: true
   },
   password: {
       type: String,
       required: true
   }
});

UserSchema.methods.setPassword = async function (pass) {
    const salt = await Bcrypt.genSalt(10);
    this.password = await Bcrypt.hashSync(pass, salt);
};

const User = Mongoose.model('User', UserSchema);

export { User };
