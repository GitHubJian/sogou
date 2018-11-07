const routes = require('./../route');

const Router = require('koa-router');
const router = new Router();

module.exports = app => {
    Object.values(routes)
        .concat(router)
        .forEach(route => {
            app.use(route.routes(), route.allowedMethods());
        });
};
