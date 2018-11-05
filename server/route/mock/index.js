const {
    pathConfig: { mock }
} = require('../../config');
const { resolve } = require('path');
const Router = require('koa-router');
const router = new Router({ prefix: '/mock' });

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

module.exports = router;
