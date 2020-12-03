import { Server  as SocketIO } from 'socket.io';

const initSocket = async (server) => {
    const io = new SocketIO(server, {
        cors: {
            origin: '*',
        }
    });


    io.on('connection', (socket) => {
        socket.on('SEND_MESSAGE', (message) => {
            io.emit('MESSAGE', message)
        });
    });

    io.on('disconnect', () => {
        console.log("A user disconnected");
    });


    return io;
};

export { initSocket };
