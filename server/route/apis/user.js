const Router = require('koa-router');
const router = new Router({ prefix: '/user' });

router.get('/getUserById/:id', (ctx, next) => {
    ctx.body = {
        name: {
            last: 'xiao1'
        }
    };
});

module.exports = router;
