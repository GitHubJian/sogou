const send = require('koa-send');
const path = require('path');
const config = require('config');
const fse = require('fs-extra');
const { static: staticPath } = config.get('path');

module.exports = () => {
    return async (ctx, next) => {
        if (fse.pathExists(path.resolve(staticPath, './404.html'))) {
            return await send(ctx, '/404.html', {
                root: staticPath
            });
        } else {
            ctx.body = `404 页面不存在 (${ctx.path})`;
        }
    };
};
