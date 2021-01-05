import Express from 'express';


import { ChatTypeRepository as Repository } from 'src/modules/chat-type/repositories/chatTypeRepository';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.all()
        .then(types => {
            return res.json(types)
        })
        .catch(next)
});

export { router as ChatTypeController };
