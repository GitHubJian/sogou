const routes = require('./../route');

module.exports = app => {
    Object.values(routes).forEach(route => {
        app.use(route.routes(), route.allowedMethods());
    });
};
