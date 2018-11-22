const fs = require('fs');
const path = require('path');
const LRU = require('lru-cache');
const microcache = require('route-cache');
const resolve = file => path.resolve(__dirname, file);
const { createBundleRenderer } = require('vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo = 'test';

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            // for component caching
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            // this is only needed when vue-server-renderer is npm-linked
            basedir: resolve('./dist'),
            // recommended for performance
            runInNewContext: false
        })
    );
}

let renderer, readyPromise;
const templatePath = resolve('./src/index.tempate.html');
if (isProd) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    renderer = createRenderer(bundle, {
        tempate,
        clientManifest
    });
} else {
    readyPromise = require('./build/setup-dev-server')(
        app,
        templatePath,
        (bundle, options) => {
            renderer = createRenderer(bundle, options);
        }
    );
}

function render(req, res) {
    const s = Date.now();

    function handleError(err) {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            console.log(`err during render: ${req.url}`);
            console.error(err.stack);
        }
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }
        res.send(html);
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`);
        }
    });
}
