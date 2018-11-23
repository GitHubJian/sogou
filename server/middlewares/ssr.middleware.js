process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const config = require('config');
const pathConfig = config.get('path');
const projectConfig = config.get('project');
const path = require('path');
const fs = require('fs');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');

const templatePath = path.resolve(pathConfig.template, 'ssr/template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
let bundle = require(path.resolve(
    pathConfig.dist,
    'vue-ssr-server-bundle.json'
));

let clientManifest = require(path.resolve(
    pathConfig.dist,
    'vue-ssr-client-manifest.json'
));

const middleware = () => {
    return async (ctx, next) => {
        let reqPath =
            ctx.path === '/'
                ? `/${projectConfig.name}/${projectConfig.index}/index.html`
                : ctx.path;

        if (!reqPath.endsWith('.html')) {
            return next();
        }

        const handleError = err => {
            if (err.url) {
                ctx.redirect(err.url);
            } else if (err.code === 404) {
                ctx.status = 404;
                ctx.body = '404 | Page Not Found';
            } else {
                // Render Error Page or Redirect
                ctx.status = 500;
                ctx.body = '500 | Internal Server Error';
                console.error(`error during render : ${reqPath}`);
                console.error(err.stack);
            }
        };
        // #issure folder is path of entry
        let [project, folder] = reqPath.split('/').filter(v => v);
        let initial = ['js/vendor.js', 'js/global.js', `js/${folder}.js`];
        let entry = `js/${folder}-server.js`;
        Object.assign(clientManifest, { initial });
        Object.assign(bundle, { entry });
        try {
            const renderer = function(template, clientManifest) {
                const context = {
                    url: ctx.path,
                    title: 'SSR TEST111'
                };

                return new Promise((res, rej) => {
                    createBundleRenderer(bundle, {
                        template,
                        clientManifest,
                        // for component caching
                        cache: new LRU({
                            max: 1000,
                            maxAge: 1000 * 60 * 15
                        }),
                        // this is only needed when vue-server-renderer is npm-linked
                        basedir: pathConfig.dist,
                        // recommended for performance
                        runInNewContext: false
                    }).renderToString(context, (err, html) => {
                        if (err) {
                            rej(err);
                        } else {
                            res(html);
                        }
                    });
                });
            };

            let html = await renderer(template, clientManifest);
            ctx.body = html;
        } catch (e) {
            handleError(e);
        }
    };
};

module.exports = middleware;
