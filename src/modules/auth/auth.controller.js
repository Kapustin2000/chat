import Express from 'express';

import { RegService } from 'src/modules/auth/services/regService';
import { LoginService } from 'src/modules/auth/services/LoginService';

const router = Express.Router();

router.post('/reg', (req, res, next) => {
    RegService
        .reg(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/login', (req, res, next) => {
    LoginService
        .login(req.body)
        .then(data => res.json(data))
        .catch(next)
});

export { router as AuthController };
