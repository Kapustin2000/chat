const findSocketByUserID = (user_id) => {
    let result;

    io.sockets.sockets.forEach(socket => {
        if(socket.user_id.toString() === user_id.toString()) {
            result = socket;
            return false
        }
    });

    return result;
};


export { findSocketByUserID };
