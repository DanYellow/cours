const routeName = (routeName, opts = {}) => {
    return function namedRoute(req, res, next) {
        if(next) {
            next();
            return;
        }

        return { name: routeName, ...opts };
    };
};

export default routeName;