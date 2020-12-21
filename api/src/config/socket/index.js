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

    findByUserID(userID) {
        return Array.from(this.clients.sockets).filter(client => {
            return userID.includes(client[1].user_id.toString())
        }).map(client => client[0]);
    }
}

export { Socket };

