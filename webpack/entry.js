const glob = require('glob');
const path = require('path');
const {
    pathConfig: { pages, prepackPath }
} = require('./config');

let entry = {},
    serverEntry = {},
    clientEntry = {};

glob.sync(path.resolve(pages, './**/index.vue'))
    .map(v => {
        return v.split('/').slice(-2, -1)[0];
    })
    .forEach(key => {
        entry[key] = path.resolve(prepackPath, `${key}.js`);
        serverEntry[key] = path.resolve(prepackPath, `${key}-server.js`);
        clientEntry[key] = path.resolve(prepackPath, `${key}-client.js`);
    });

module.exports = { entry, serverEntry, clientEntry };
