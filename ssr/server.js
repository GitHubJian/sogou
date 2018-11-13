const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const { createBundleRenderer } = require('vue-server-renderer');
const server = new Koa();

const bundle = fs.readFileSync(
    path.resolve(__dirname, 'dist/server.js'),
    'utf-8'
);

const renderer = createBundleRenderer(bundle, {
    // 推荐
    runInNewContext: false,
    // 模板
    template: fs.readFileSync(
        path.resolve(__dirname, 'dist/index.ssr.html'),
        'utf-8'
    )
});

function render() {
    return new Promise((resolve, reject) => {
        renderer.renderToString((err, html) => {
            if (err) {
                reject(err);
            }
            resolve(html);
        });
    });
}

server.use(koaBody({ patchKoa: true }));

server.use(async (ctx, next) => {
    let reqPath = ctx.path == '/' ? '/index.html' : ctx.path;
    let filepath = path.join(__dirname, 'dist', './', reqPath);
    let exists = fs.existsSync(filepath);
    if (exists) {
        await koaSend(ctx, reqPath, {
            root: path.resolve(__dirname, 'dist')
        });
    } else {
        const res = await render();
        ctx.body = res;
    }
});

let port = 8417;

server.listen(port, () => {
    console.log(`✨ 服务已经启动http://localhost:${port}`);
});
