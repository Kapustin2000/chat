import { User } from 'src/modules/user/user.model';
import JWT from 'jsonwebtoken';

const AuthMiddleware = function (req, res, next) {
   auth(req.headers.authorization)
       .then(user => {
           req.payload = { user };
           next();
       })
       .catch(err => {
           console.error(err);
       });
};

const auth = async function (auth) {
    auth = auth.split(' ')[1];

    let decoded = await new Promise((resolve, reject) => {
        JWT.verify(auth, process.env['TOKEN_SECRET'], function (err, decoded) {
            if(err) {
                reject(err);
            }

            resolve(decoded)
        });
    }).catch(err => {
        throw err;
    });

    const user = await User.findOne({
        _id: decoded.id
    }).populate('role');

    if(user) {
        return user;
    }

    throw 'aunthorized';
};
export { AuthMiddleware, auth };
