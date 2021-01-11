import { initSocket } from 'src/config/socket/io';

class Socket {
    constructor(server) {
        this.socket = initSocket(server)
    }

    get clients() {
        return this.socket.sockets;
    }

    get rooms() {
        return this.clients.adapter.rooms;
    }

    findRoom(room) {
        if(this.rooms.has(room)) {
            return this.rooms.get(room);
        }

        return "not found";
    }

    findRoomSize(room) {
        return this.findRoom(room).size;
    }

    joinRoom(userID, roomId) {
        let socket = this.findByUserID(userID);

        if(socket) {
            console.log(socket.id, " I AM FOUND");
            socket.join(roomId);
        }

        return socket;
    }

    findByUserID(userID) {
        let client;
        this.clients.sockets.forEach((socket) => {
            if(socket.user_id.toString() === userID.toString()) {
                return client = socket;
            }
        });

        return client;
    }
}

export { Socket };

