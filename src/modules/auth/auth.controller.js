import Express from 'express';

import { RegService } from 'src/modules/auth/services/RegService';

const router = Express.Router();

router.post('/reg', (req, res, next) => {
    RegService
        .reg(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/login', (req, res, next) => {
    res.send("login");
});

export { router as AuthController };
