const routes = require('./routes');

module.exports = (router) => {
    router.get('/v0/youla/', routes);

    return router;
};
