import Express from 'express';
import { TodoRepository as Repository } from 'src/modules/todo/repositories/todoRepository';

const router = Express.Router();

router.get('/', async function (req, res, next) {
    let todos = Repository.get();

    res.json(todos);
});

router.post('/', function (req, res, next) {
    res.json([]);
});

router.get('/{id}', function (req, res, next) {
    res.json([]);
});

router.delete('/{id}', function (req, res, next) {
    res.json([]);
});

export { router as TodoController};
