import { Todo } from 'src/modules/todo/todo.model';

const TodoRepository = {
    async get(user_id) {
        return  await Todo.find({
            user_id: user_id
        });
    },

    async find(id, user_id) {
        return await Todo.find({
            _id: id,
            user_id: user_id
        });
    }
};

export { TodoRepository };
