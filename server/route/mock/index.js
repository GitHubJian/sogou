const config = require('config');
const { mock } = config.get('path');
const { url } = config.get('server');

const prefix = '/mock';
const { resolve } = require('path');
const Router = require('koa-router');
const router = new Router({ prefix });

router.get('/user/getUserById/:id', (ctx, next) => {
    let { 2: fileName, 3: methodName } = ctx.path.split('/');

    let filepath = resolve(mock, `${fileName}.js`);

    Reflect.deleteProperty(require.cache, filepath);

    let obj = require(filepath);
    let res = obj[methodName].call(null);

    ctx.body = {
        res
    };
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
