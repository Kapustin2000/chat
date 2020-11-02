import Express from 'express';
const router = new Express.Router();

router.get('/', (req, res) => {
    res.send("Hello world");
});

export { router };
