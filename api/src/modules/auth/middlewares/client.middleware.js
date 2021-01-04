const ClientMiddleware = function (req, res, next) {
    if(req.payload.user.role.name.toLowerCase() === 'client') {
       next();
   }

   next()
};


export { ClientMiddleware };
