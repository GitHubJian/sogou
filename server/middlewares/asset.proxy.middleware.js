const send = require('koa-send');
const path = require('path');
const config = require('config');
const fse = require('fs-extra');
const { static: staticPath } = config.get('path');

module.exports = () => {
    return async (ctx, next) => {
        let maxage = 365 * 24 * 60 * 60 * 1000; // one year
        let reqPath = ctx.path;

        if (reqPath === '/') reqPath = '/index.html';

        if (/.*\.html$/.test(reqPath)) {
            maxage = 0;
        }

        let filePath = path.resolve(staticPath, `.${reqPath}`);
        const exists = await fse.pathExists(filePath);

        let result;

        if (exists) {
            result = await send(ctx, reqPath, {
                root: staticPath,
                maxage,
                setHeaders: (res, path, stats) => {
                    res.setHeader('Author', 'ws.xiao');
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
            await next();
        }
    };
};
