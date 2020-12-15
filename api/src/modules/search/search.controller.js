import Express from 'express';

import { SearchService  } from 'src/modules/search/services/searchService';

const router = Express.Router();

router.post('/search', (req, res, next) => {
    SearchService
        .search(req.payload.user._id)
        .then(data => res.json(data))
        .catch(next)
});

export { router as SearchController };
