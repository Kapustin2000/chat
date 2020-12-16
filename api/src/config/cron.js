import cron from 'node-cron';

import { Search } from 'src/modules/search/search.model';

const configCron = async () => {
    cron.schedule('* * * * *', async function() {
        let lobbySize = process.env.LOBBY_SIZE || 3;
        let inQueue = await Search.find({}).limit(lobbySize);

        if(inQueue.length === lobbySize) {
            inQueue = inQueue.map(user => { return user._id.toString()});

            let sockets = Array.from(io.sockets.sockets);
            sockets = sockets.filter(socket => {
                return inQueue.includes(socket[1].user_id.toString())
            }).map(socket => socket[0]);

            if(sockets.length === lobbySize) {
                console.log("successsss");
            }
        }
    });

    // console.log(cron);
};

export { configCron };
