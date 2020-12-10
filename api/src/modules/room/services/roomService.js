import { Room } from 'src/modules/room/room.model';

const RoomService = {
    async save(data) {
        const { name, members } = data;

        let room = new Room({
            name: name,
            members: members
        });

        room = await room.save();

        return room;
    },

    async join(room, user_id) {
        await room.updateOne({ $addToSet:
            {members : user_id}
        });

        return room;
    },

    async leave(room, user_id) {
        await room.updateOne({ $pull:
            {members : user_id}
        });

        return room;
    }
};

export { RoomService };
