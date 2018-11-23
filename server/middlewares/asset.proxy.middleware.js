const send = require('koa-send');
const path = require('path');
const fse = require('fs-extra');
const pathConfig = require('config').get('path');

module.exports = () => {
    return async (ctx, next) => {
        let maxage = 365 * 24 * 60 * 60 * 1000; // one year
        let reqPath = ctx.path;

        let filePath = path.resolve(pathConfig.static, `.${reqPath}`);
        const exists = await fse.pathExists(filePath);

        let result;
        if (exists) {
            result = await send(ctx, reqPath, {
                root: pathConfig.static,
                maxage,
                setHeaders: (res, path, stats) => {
                    res.setHeader('Author', 'xiaows');
                    if (path.endsWith('.json')) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                    }
                    // res.setHeader(
                    //     'Cache-Control',
                    //     `max-age=${
                    //         path.endsWith('.html') ? 0 : 3.1536 * 1e10
                    //     },must-revalidate`
                    // );
                    res.setHeader('Cache-Control', `max-age=0,must-revalidate`);
                }
            });
        }

        if (!result) {
            ctx.status = 404;
            ctx.body = `404 | Page Not Found | ${ctx.path}`;
        }
    };
};
