import Express from 'express';
import { TodoRepository as Repository } from 'src/modules/todo/repositories/todoRepository';
import { TodoService as Service } from 'src/modules/todo/services/todoService';
import { TodoMiddleware } from 'src/modules/todo/todo.middleware';
const router = Express.Router();

router.get('/', async function (req, res, next) {
    let todos = await Repository.get(req.payload.user._id);

    res.json(todos);
});

router.post('/', async function (req, res, next) {
    req.body.user_id = req.payload.user._id;
    let todo = await Service.save(req.body);
    res.json(todo);
});

router.get('/:id', [TodoMiddleware], async function (req, res, next) {
    let todo = await Repository.find(req.params.id, req.payload.user._id);

    res.json(todo);
});

router.put('/:id', [TodoMiddleware], async function (req, res, next) {
    let updated = await Service.update(req.body);
    res.json(updated);
});

router.delete('/:id', [TodoMiddleware], async function (req, res, next) {
    let deleted =  await Service.delete(req.body);

    res.json(deleted);
});

export { router as TodoController};
