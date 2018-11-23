const { pages, prepackPath } = require('config').get('path');
const reslib = require('app-root-path').resolve;
const appTemplatePath = reslib('/template/ssr/app.js');
const clientTemplatePath = reslib('/template/ssr/entry-client.js');
const serverTemplatePath = reslib('/template/ssr/entry-server.js');

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Mustache = require('mustache');

const createSSRFile = async (key = 'index') => {
    const reader = p => fs.readFileSync(p, { encoding: 'utf-8' });

    const appContent = Mustache.render(reader(appTemplatePath), {
        app: path.resolve(pages, `${key}`)
    });
    const serverContent = reader(serverTemplatePath);
    const clientContent = reader(clientTemplatePath);

    let appPath = path.resolve(prepackPath, `./ssr/${key}/app.js`);
    let serverPath = path.resolve(prepackPath, `./ssr/${key}/entry-server.js`);
    let clientPath = path.resolve(prepackPath, `./ssr/${key}/entry-client.js`);

    const writer = (p, c) => fse.outputFileSync(p, c, { encoding: 'utf-8' });

    let entries = [
        [appPath, appContent],
        [serverPath, serverContent],
        [clientPath, clientContent]
    ];

    for (const entry of entries) {
        await writer.apply(null, entry);
    }
};

const prepack = async () => {
    let keys = glob.sync(path.resolve(pages, './**/app.vue')).map(v => {
        return v.split('/').slice(-2, -1)[0];
    });

    for (const key of keys) {
        await createSSRFile(key);
    }
};

module.exports = prepack;
