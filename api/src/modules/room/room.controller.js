import Express from 'express';

import { RoomService } from 'src/modules/room/services/roomService';
import { RoomRepository  as Repository } from 'src/modules/room/repositories/roomRepository';
import { findSocketByUserID } from 'src/config/helpers';

const router = Express.Router();

router.get('/', (req, res, next) => {
    Repository.get()
        .then(rooms => res.json(rooms))
        .catch(next);
});

router.get('/init', (req, res, next) => {
    Repository.get(req.payload.user._id)
        .then(rooms => {
            rooms = rooms.map(room => { return room._id.toString()});
            let socket = findSocketByUserID(req.payload.user._id);

            if(socket) {
                socket.join(rooms);
            }

            // console.log(io.sockets.adapter.rooms, 123);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    RoomService
        .save({
            name: req.body.name,
            members: [
                req.payload.user._id
            ]
        })
        .then(data => res.json(data))
        .catch(next)
});


router.post('/:room/join', (req, res, next) => {
    let user_id = req.payload.user._id;
    Repository.find(req.params.room)
        .then(room => {
            RoomService
                .join(room, user_id)
                .then(data => res.json(data))
                .catch(next)
        }).catch(err => {
            next(err);
    });
});

router.post('/:room/leave', (req, res, next) => {
    let user_id = req.payload.user._id;
    Repository.find(req.params.room)
        .then(room => {
            RoomService
                .leave(room, user_id)
                .then(data => res.json(data))
                .catch(next)
        }).catch(err => {
        next(err);
    });
});



export { router as RoomController };
