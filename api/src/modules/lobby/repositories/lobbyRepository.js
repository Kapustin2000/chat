import { Lobby } from 'src/modules/lobby/lobby.model';

const LobbyRepository = {
    async get(user_id) {
        return  await Lobby.find({
            user_id: user_id
        });
    },

    async find(id, user_id) {
        return await Lobby.find({
            _id: id,
            user_id: user_id
        });
    }
};

export { LobbyRepository };
