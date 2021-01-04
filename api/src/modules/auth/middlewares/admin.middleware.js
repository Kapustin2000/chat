const AdminMiddleware = function (req, res, next) {
   if(req.payload.user.role.name.toLowerCase() === 'admin') {
       next();
   }

   next()
};


export { AdminMiddleware };
