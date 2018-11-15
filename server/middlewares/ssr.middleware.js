const { static: staticPath } = require('config').get('path');
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');

const createContent = key => {
    const bundle = fs.readFileSync(
        path.resolve(staticPath, `server/${key}.js`),
        'utf-8'
    );

    const renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(staticPath, `${key}.ssr.html`), {
            encoding: 'utf-8'
        })
    });

    return new Promise((resolve, reject) => {
        renderer.renderToString((err, html) => {
            if (err) reject(err);
            resolve(html);
        });
    });
};

module.exports = () => {
    return async (ctx, next) => {
        let reqPath = ctx.path == '/' ? '/index.html' : ctx.path;

        if (!reqPath.endsWith('.html')) {
            return next();
        }

        let basename = path.basename(reqPath),
            [filename, ext] = basename.split('.');

        createContent(filename)
            .then(html => {
                ctx.status = 200;
                ctx.body = html;
            })
            .catch(err => {
                ctx.status = 500;
                ctx.body = err;
            });
    };
};
