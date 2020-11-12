import Mongoose from 'mongoose';

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

UserSchema.methods.setPassword = function (pass) {
    this.password = pass;
};

const User = Mongoose.model('User', UserSchema);

export { User };
