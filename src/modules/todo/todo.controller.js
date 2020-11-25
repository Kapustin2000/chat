import Express from 'express';

const router = Express.Router();

router.get('/', function (req, res, next) {
    res.json([]);
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
