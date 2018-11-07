const path = require('path');
const root = process.cwd();
const { url, db } = require('config').get('mongodb');
const { default: connect, insertDocuments } = require(path.resolve(
    root,
    'mongodb'
));

const Router = require('koa-router');
const router = new Router({ prefix: '/mongodb' });

router.post('/api', async (ctx, next) => {
    let body = ctx.request.body;
    debugger;
    await connect(
        url,
        db
    )
        .then(db => {
            const user = db.collection('user');

            return insertDocuments(user, [body]);
        })
        .then(res => {
            debugger;
            ctx.body = {
                code: 0,
                data: res,
                msg: 'Mongodb Save Success...'
            };
        })
        .catch(e => {
            console.error(e);

            ctx.body = {
                code: 1,
                data: e,
                msg: 'Mongodb Save Fuil!!'
            };
        });
});

module.exports = router;
