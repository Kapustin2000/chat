import Express from 'express';
const router = new Express.Router();

import { AuthController } from '../modules/auth/auth.controller';


router.get('/', (req, res) => {
    res.send("Hello world");
});

router.use('/auth', AuthController);

export { router };
