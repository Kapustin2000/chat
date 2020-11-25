import Mongoose from 'mongoose';

const TodoSchema = new Mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   user_id: {
       type: String,
       required: true
   }
});

const Todo = Mongoose.model('Todo', TodoSchema);

export { Todo };
