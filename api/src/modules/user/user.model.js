import Mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

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
   role: {
       type: Mongoose.Schema.Types.ObjectId,
       ref: 'Role',
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

UserSchema.methods.generateJWT = async function () {
    return JWT.sign({
        id: this._id
    }, process.env['TOKEN_SECRET']);
};

UserSchema.methods.comparePassword = async function (pass) {
    return await Bcrypt.compare(pass, this.password);
};

const User = Mongoose.model('User', UserSchema);

export { User };
