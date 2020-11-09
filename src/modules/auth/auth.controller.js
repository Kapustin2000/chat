import Express from 'express';

const router = Express.Router();

router.get('/reg', (req, res, next) => {
    res.send("reg");
});

router.post('/login', (req, res, next) => {
    res.send("login");
});

export { router as AuthController };
