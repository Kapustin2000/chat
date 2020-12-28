import Express from 'express';


import { ChatTypeRepository as Repository } from 'src/modules/chat-type/repositories/chatTypeRepository';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.all()
        .then(types => res.json(types))
        .catch(next)
});

export { router as ChatTypeController };
