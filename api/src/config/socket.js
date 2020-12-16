import { initSocket } from 'src/config/io';

class Socket {
    constructor(server) {
        this.socket = initSocket(server)
    }

    get clients() {
        return this.socket.sockets;
    }

    findByUserID(user_id) {
        return Array.from(this.clients).filter(client => {
            return names.includes(client[1].user_id.toString())
        }).map(client => client[0]);
    }
}

export { Socket };

