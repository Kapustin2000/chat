import cron from 'node-cron';
// import Bcrypt from 'bcrypt';
import { GameFound } from './jobs';
// import { Search } from 'src/modules/search/search.model';

const configCron = async () => {
    // cron.schedule('* * * * * *', async function() {
    //     let lobbySize = process.env.LOBBY_SIZE || 2;
    //     let inQueue = await Search.find( {pending: {$ne: true} }
    //     ).limit(lobbySize);
    //     if(inQueue.length === lobbySize) {
    //
    //         let userIDs = inQueue.map(user => { return user.user_id.toString()});
    //         let sockets = io.findByUserID(userIDs);
    //
    //         if(sockets.length >= lobbySize) {
    //             let lobbyID = await Bcrypt.genSalt(20);
    //             sockets.forEach(socket => {
    //                 io.socket.to(socket).emit('GAME_FOUND', lobbyID);
    //             });
    //
    //             await Search.update({
    //                 _id: {$in : inQueue.map(user => { return user._id })},
    //                 $set: {pending: true}
    //             });
    //
    //             setTimeout(async () => {
    //                 if(io.findRoomSize(lobbyID) === lobbySize) {
    //                    return io.socket.to(sockets).emit('GAME_STARTED', lobbyID)
    //                 }
    //
    //                 io.socket.to(sockets).emit('GAME_NOT_STARTED', "Someone didn't accept game.")
    //
    //                 return await Search.update({
    //                     user_id: {$in : inQueue},
    //                     $set: {pending: false}
    //                 });
    //             }, 30)
    //         }
    //     }
    // });

    // console.log(cron);

    // cron.schedule('* * * * * *', GameFound);
};

export { configCron };
