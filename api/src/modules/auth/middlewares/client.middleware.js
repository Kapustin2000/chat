const ClientMiddleware = function (req, res, next) {
    if(!req.payload.user.role || req.payload.user.role.name.toLowerCase() === 'client') {
       return next();
   }

   return next();
};


export { ClientMiddleware };
