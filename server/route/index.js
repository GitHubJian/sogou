const glob = require('glob');
const path = require('path');

const routers = glob
    .sync(path.resolve(__dirname, './*/index.js'))
    .reduce((prev, cur) => {
        let key = cur.split('/').slice(-2, -1)[0];
        prev[key] = require(cur);

        return prev;
    }, {});

module.exports = routers;
