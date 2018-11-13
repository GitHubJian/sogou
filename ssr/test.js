const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const path = require('path');

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

renderer.renderToString((err, html) => {
    if (err) {
        console.log(err);
    } else {
        console.log(html);
    }
});
