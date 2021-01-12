const AdminMiddleware = function (req, res, next) {
    console.log(req.payload.user);
   if(req.payload.user.role.name.toLowerCase() === 'admin') {
       return next();
   }

   return next()
};


export { AdminMiddleware };
