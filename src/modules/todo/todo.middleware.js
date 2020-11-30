import { Todo } from 'src/modules/todo/todo.model';

const TodoMiddleware = async function (req, res, next) {
    let todo_id = req.params.id,
        user_id = req.payload.user._id;

    hasTodo(todo_id, user_id)
        .then(todo => {
            req.body.id = todo._id;
            req.body.user_id = req.payload.user._id;
            next();
        })
        .catch(err => {
            throw err;
        });
};

const hasTodo = function (id, user_id) {
   return  new Promise((resolve, reject) => {
       Todo.findOne({
           _id: id,
           user_id: user_id
       }, function (err, todo) {
           if (err) {
               reject(err);
           }

           resolve(todo);
       });
   }).catch(err => {
       throw err;
   });
};

export { TodoMiddleware };
