const ClientMiddleware = function (req, res, next) {
   if(req.payload.user.role === 2) {
       next();
   }

   next()
};


export { ClientMiddleware };
