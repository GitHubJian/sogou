const glob = require('glob');
const { pathConfig } = require('./config');
const { resolve, basename } = require('path');
const { statSync } = require('fs');

const alias = glob
    .sync(resolve(pathConfig.src, './*'))
    .filter(v => {
        return statSync(v).isDirectory();
    })
    .reduce((prev, cur) => {
        prev[basename(cur)] = cur;
        return prev;
    }, {});

module.exports = { alias };
