const routes = require('./../route');

const Router = require('koa-router');
const router = new Router();

router.all('*', (ctx, next) => {
    let url = ctx.path;

    ctx.body = {
        code: 1,
        data: url,
        meg: `不存在当前路由${url}`
    };
});

module.exports = app => {
    Object.values(routes)
        .concat(router)
        .forEach(route => {
            app.use(route.routes(), route.allowedMethods());
        });
};
