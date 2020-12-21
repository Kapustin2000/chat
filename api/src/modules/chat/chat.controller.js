import Express from 'express';

import { JoinService } from 'src/modules/chat/services/joinService';

const router = Express.Router();

router.get('/', (req, res, next) => {
    LoginService
        .login(req.body)
        .then(data => res.json(data))
        .catch(next)
});

router.post('/join', (req, res, next) => {
    JoinService
        .join(req.body)
        .then(data => res.json(data))
        .catch(next)
});

export { router as ChatController };
