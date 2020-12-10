import { Room } from 'src/modules/room/room.model';

const RoomRepository = {
    async get(user_id) {
        return  await Room.find({});
    },

    async find(id) {
        return await Room.findOne({
            _id: id,
        });
    }
};

export { RoomRepository };
