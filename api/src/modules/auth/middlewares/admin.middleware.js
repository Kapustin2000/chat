const AdminMiddleware = function (req, res, next) {
   if(req.payload.user.role.name.toLowerCase() === 'admin') {
       return next();
   }

   return next()
};


export { AdminMiddleware };
