import { Server  as SocketIO } from 'socket.io';
import { auth } from 'src/modules/auth/middlewares/auth.middleware';
import { Role } from 'src/modules/user/role.model';

const initSocket = (server) => {
    const io = new SocketIO(server, {
        cors: {
            origin: '*',
        }
    });

    io.use((socket, next) => {
        const { token } = socket.handshake.auth;

        if(!token) {
            return next(new Error("thou shall not pass"));
        }

        auth(token)
            .then(user => {
                socket.user_id = user._id.toString();
                console.log(user.role.name === "Admin");
                if(user.role.name === "Admin") {
                    socket.join("admin");
                }
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
