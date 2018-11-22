const { static: staticPath } = require('config').get('path');
const fs = require('fs');
const path = require('path');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require(path.resolve(
    staticPath,
    'vue-ssr-server-bundle.json'
));

const clientManifest = require(path.resolve(
    staticPath,
    'vue-ssr-client-manifest.json'
));

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    // template: fs.readFileSync(path.resolve(staticPath, `${key}.ssr.html`), {
    //     encoding: 'utf-8'
    // }),
    clientManifest
});

const createContent = (context, key) => {
    // const bundle = fs.readFileSync(
    //     path.resolve(staticPath, `server/${key}.js`),
    //     'utf-8'
    // );

    const renderer = createBundleRenderer(serverBundle, {
        runInNewContext: false,
        // template: fs.readFileSync(path.resolve(staticPath, `${key}.ssr.html`), {
        //     encoding: 'utf-8'
        // }),
        clientManifest
    });

    return new Promise((resolve, reject) => {
        renderer.renderToString({}, (err, html) => {
            if (err) reject(err);
            resolve(html);
        });
    });
};

module.exports = () => {
    return async (ctx, next) => {
        debugger;
        let reqPath = ctx.path == '/' ? '/index.html' : ctx.path;

        if (!reqPath.endsWith('.html')) {
            return next();
        }

        let basename = path.basename(reqPath),
            [filename, ext] = basename.split('.');

        renderer.renderToString({ url: '/input.html' }, (err, html) => {
            debugger;
            if (err) {
                ctx.body = err;
            } else {
                ctx.body = html;
            }
        });

        // createContent(filename)
        //     .then(html => {
        //         ctx.status = 200;
        //         ctx.body = html;
        //     })
        //     .catch(err => {
        //         ctx.status = 500;
        //         ctx.body = err;
        //     });
    };
};
