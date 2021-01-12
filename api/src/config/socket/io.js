import { Server  as SocketIO } from 'socket.io';
import { auth } from 'src/modules/auth/middlewares/auth.middleware';

const initSocket = (server) => {
    const io = new SocketIO(server, {
        cors: {
            origin: '*',
        }
    });

    io.use((socket, next) => {
        const { token } = socket.handshake.auth;
        console.log(socket.id, "it is initiation");

        if(!token) {
            return next(new Error("thou shall not pass"));
        }

        console.log(token);

        auth(token)
            .then(user => {
                socket.user_id = user._id.toString();
                console.log(socket.id, socket.user_id, "it is authhh");
                return next();
            }).catch(err => {
            return next(new Error(err));
        });
    });

    io.on('connection', (socket) => {

    });

    io.on('disconnect', () => {
        console.log("A user disconnected");
    });


     return io;
};

export { initSocket };
