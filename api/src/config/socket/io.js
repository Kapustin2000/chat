import { Server  as SocketIO } from 'socket.io';
import { auth } from 'src/modules/auth/auth.middleware';

const initSocket = (server) => {
    const io = new SocketIO(server, {
        cors: {
            origin: '*',
        }
    });

    io.use((socket, next) => {
        const { token } = socket.handshake.auth;

        if(!token) {
            next(new Error("thou shall not pass"));
        }

        auth(token)
            .then(user => {
                socket.user_id = user._id;
                next();
            }).catch(err => {
            next(new Error(err));
        });
    });

    io.on('connection', (socket) => {
        socket.join("default");

        io.in("default").emit('MESSAGE', {
            text: "Socket "+ socket.id + "joined"
        });
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
