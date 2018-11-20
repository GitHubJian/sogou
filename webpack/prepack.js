const {
    pathConfig: { pages, prepackPath }
} = require('./config');

const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');
const fs = require('fs');

const createContent = (p, router) => {
    return [
        `import Vue from 'vue';`,
        `import entry from '${p}/index.vue';`,
        router ? `import router from '${p}/router.js';` : '',
        '',
        `export default new Vue({`,
        router ? `    router,` : '',
        `    el: '#app',`,
        `    render: h => h(entry)`,
        `})`
    ].join('\n');
};

const prepack = async () => {
    return glob
        .sync(path.resolve(pages, './**/index.vue'))
        .forEach(async entry => {
            let p = entry
                .split('/')
                .slice(0, -1)
                .join('/');
            let key = entry.split('/').slice(-2, -1)[0];
            let filePath = path.resolve(prepackPath, `${key}.js`);
            let hasRouter = await fs.existsSync(`${p}/router.js`);
            await fse.outputFileSync(filePath, createContent(p, hasRouter), {
                encoding: 'utf-8'
            });
        });
};

prepack();

module.exports = prepack;
