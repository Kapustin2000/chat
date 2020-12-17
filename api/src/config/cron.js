import cron from 'node-cron';
import Bcrypt from 'bcrypt';

import { Search } from 'src/modules/search/search.model';

const configCron = async () => {
    cron.schedule('* * * * *', async function() {
        let lobbySize = process.env.LOBBY_SIZE || 2;
        let inQueue = await Search.find({}).limit(lobbySize);

        if(inQueue.length === lobbySize) {
            inQueue = inQueue.map(user => { return user._id.toString()});

            let sockets = io.findByUserID(inQueue);

            if(sockets.length === lobbySize) {
                let lobbyID = await Bcrypt.genSalt(20);
                io.socket.to(sockets).emit('GAME_FOUND', lobbyID);

                setTimeout(() => {
                    if(io.findRoomSize(lobbyID) === lobbySize) {
                        io.socket.to(sockets).emit('GAME_STARTED', lobbyID)
                    }

                    io.socket.to(sockets).emit('GAME_NOT_STARTED', "Someone didn't accept game.")
                }, 30)
            }
        }
    });

    // console.log(cron);
};

export { configCron };
