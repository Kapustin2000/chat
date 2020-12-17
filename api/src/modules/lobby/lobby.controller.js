import Express from 'express';

import { LobbyService as Service  } from 'src/modules/lobby/services/lobbyService';
import { LobbyRepository as Repository  } from 'src/modules/lobby/repositories/lobbyRepository';


const router = Express.Router();

router.get('/:lobby', (req, res, next) => {
    Repository
        .find(req.params.lobby)
        .then(data => res.json(data))
        .catch(next)
});


router.post('/:lobby/accept', (req, res, next) => {
    let socket = io.findByUserID(req.payload.user._id);

    socket.join(req.params.lobby);

    res.json({
        "message": "Waiting other players"
    })
});

export { router as LobbyController };
