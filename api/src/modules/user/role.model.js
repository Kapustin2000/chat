import Mongoose from 'mongoose';

const RoleSchema = new Mongoose.Schema({
   name: {
       type: String,
       required: true
   }
});

const Role = Mongoose.model('Role', RoleSchema);

export { Role };
