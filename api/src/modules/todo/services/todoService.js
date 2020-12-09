import { Todo } from 'src/modules/todo/todo.model';

const TodoService = {
    async save(data) {
        const { title, user_id } = data;

        let todo = new Todo({
           title: title,
           user_id: user_id
        });

        return await todo.save();
    },

    async update(data) {
        const { id, title, user_id } = data;

        return await Todo.updateOne({
            _id: id,
            user_id: user_id
        }, { $set: {
            title: title
        }});
    },

    async delete(data) {
        const { user_id, id } = data;

        return await Todo.deleteOne({
            _id: id,
            user_id: user_id
        })
    }
};

export { TodoService };
