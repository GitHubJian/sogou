const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const path = require('path');
const glob = require('glob');

glob.sync(path.resolve(__dirname, '!(index).js')).forEach(val => {
    let route = require(val);
    router.use(route.routes(), route.allowedMethods());
});

module.exports = router;
