import Express from 'express';

const router = new Express.Router();

/** Controllers **/
import { AuthController } from 'src/modules/auth/auth.controller';
import { SearchController } from 'src/modules/search/search.controller';
import { LobbyController } from 'src/modules/lobby/lobby.controller';


/** Middlewares **/
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

router.get('/', (req, res) => {
    res.send("Hello world");
});

router.use('/auth', AuthController);

router.use('/search',  [AuthMiddleware, SearchController]);

router.use('/lobbies', [AuthMiddleware, LobbyController]);

router.use('/user', [AuthMiddleware, async (req, res, next) => {
    res.json(req.payload.user);
}]);

export { router };
