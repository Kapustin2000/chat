import { Todo } from 'src/modules/todo/todo.model';

const TodoRepository = {
    async get() {
       return  await Todo.find();
    },

    async find(id) {
        return await Todo.find({
            _id: id
        });
    }
};

export { TodoRepository };
