const authMiddleware = ({next, store}) => {
    if(!store.getters.auth.token) {
        return next({
            name: 'Login'
        })
    }

    next();
};

export { authMiddleware };
