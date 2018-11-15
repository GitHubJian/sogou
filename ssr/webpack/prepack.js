const glob = require('glob');
const { resolve } = require('path');
const root = process.cwd();

const entry = glob
    .sync(resolve(root, 'ssr/pages/**/index.vue'))
    .reduce((prev, cur) => {
        let entryKey = cur.split('/').slice(-2, -1)[0];
        let entryValue = resolve(prepackPath, `${entryKey}.js`);

        prev[entryKey] = entryValue;
        return prev;
    }, {});

console.log(entry);

module.exports = { entry };
