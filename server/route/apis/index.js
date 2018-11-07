const prefix = '/api';
const Router = require('koa-router');
const config = require('config');
const { url } = config.get('server');
const router = new Router({ prefix });
const path = require('path');
const glob = require('glob');

glob.sync(path.resolve(__dirname, '!(index).js')).forEach(val => {
    let route = require(val);
    router.use(route.routes(), route.allowedMethods());
});

router.all('*', (ctx, next) => {
    let path = ctx.path;
    ctx.body = {
        code: 1,
        data: path,
        msg: `不存在当前路由: http://${url}${prefix}${path}`
    };
});

module.exports = router;
