import Express from 'express';

const router = new Express.Router();

/** Controllers **/
import { AuthController } from 'src/modules/auth/auth.controller';
import { SearchController } from 'src/modules/search/search.controller';


/** Middlewares **/
import { AuthMiddleware } from 'src/modules/auth/auth.middleware';

router.get('/', (req, res) => {
    res.send("Hello world");
});

router.use('/auth', AuthController);

router.use('/',  [AuthMiddleware, SearchController]);

router.use('/user', [AuthMiddleware, (req, res, next) => {
    let sockets = Array.from(io.sockets.sockets);

    let names = ['5fc76da897f6f4006e7ee73d'];
    sockets = sockets.filter(socket => {
        return names.includes(socket[1].user_id.toString())
    }).map(socket => socket[0]);

    console.log(sockets);
    // console.log(sockets[0]);

    res.json(req.payload.user);
}]);

export { router };
