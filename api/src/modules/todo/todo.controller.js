import Express from 'express';
import { TodoRepository as Repository } from 'src/modules/todo/repositories/todoRepository';
import { TodoService as Service } from 'src/modules/todo/services/todoService';
import { TodoMiddleware } from 'src/modules/todo/todo.middleware';
const router = Express.Router();

router.get('/', function (req, res, next) {
     Repository.get(req.payload.user._id)
        .then(todo => res.json(todo))
        .catch(next);
});

router.post('/', (req, res, next) => {
    req.body.user_id = req.payload.user._id;
    Service.save(req.body)
        .then(todo => res.json(todo))
        .catch(next);
});

router.get('/:id', [TodoMiddleware], (req, res, next) => {
    Repository.find(req.params.id, req.payload.user._id)
         .then(todo => res.json(todo))
         .catch(next);
});

router.put('/:id', [TodoMiddleware], (req, res, next) => {
    Service.update(req.body)
        .then(todo => res.json(todo))
        .catch(next);
});

router.delete('/:id', [TodoMiddleware], (req, res, next) => {
     Service.delete(req.body)
        .then(todo => res.json(todo))
        .catch(next);
});

export { router as TodoController};
