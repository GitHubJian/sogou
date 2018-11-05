require('babel-polyfill');
require('babel-register')({
    presets: ['es2015', 'stage-0'],
    plugins: ['add-module-exports']
});

const apis = require('../index.js');
console.log(apis);
