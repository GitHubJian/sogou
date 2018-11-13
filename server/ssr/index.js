require('babel-polyfill');
require('babel-register')({
    presets: ['es2015', 'stage-0'],
    plugins: ['add-module-exports']
});

const root = process.cwd();
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer();
const entry = path.resolve(root, '.temp/prepack/index.js');

const app = require(entry);

renderer
    .renderToString(app)
    .then(html => {
        console.log(html);
    })
    .catch(err => {
        console.error(err);
    });
