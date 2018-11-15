const {
    pathConfig: {
        src,
        pages,
        prepackPath,
        static: staticPath,
        zoo,
        globalServer: global
    }
} = require('./config');

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const createSSRContent = (key = 'index') => {
    const appjsPath = path.resolve(prepackPath, `${key}.js`);
    const entryPath = path.resolve(pages, `${key}/index.vue`);
    const storePath = path.resolve(pages, `${key}/store.js`);
    let isStoreJSExists = fs.existsSync(storePath);

    const appContent = [
        `
        import Vue from '${global}';
        import App from '${entryPath}';
        ${isStoreJSExists ? `import store from '${storePath}';` : ''}

        const app = new Vue({
            ${isStoreJSExists ? 'store,' : ''}
            render: h => h(App)
        });

        export { 
            app, 
            ${isStoreJSExists ? 'store,' : ''}
            App 
        };
        `
    ].join('/n');

    const serverContent = [
        `
        import { 
            app, 
            ${isStoreJSExists ? 'store,' : ''}
            App 
        } from './${key}-app.js';
        
        export default context => {
            return new Promise((resolve, reject) => {
                if(typeof App.superme === 'function'){
                    App.superme({ 
                        ${isStoreJSExists ? 'store' : ''}
                     }).then(() => {
                        ${isStoreJSExists ? 'context.state = store.state;' : ''}
                        resolve(app);
                    });
                }else{
                    resolve(app)
                }
            });
        };
        `
    ].join('/n');

    const clientContent = [
        `
        import { 
            app, 
            ${isStoreJSExists ? 'store' : ''}
        } from './${key}-app.js';

        ${
            isStoreJSExists
                ? `
                if (window.__INITIAL_STATE__) {
                    store.replaceState(window.__INITIAL_STATE__);
                }
                `
                : ''
        }
        
        app.$mount('#app');
        `
    ].join('/n');

    return { appContent, serverContent, clientContent };
};

const writeSSRFile = async (key = 'index') => {
    const { appContent, serverContent, clientContent } = createSSRContent(key);
    let appPath = path.resolve(prepackPath, `${key}-app.js`),
        serverPath = path.resolve(prepackPath, `${key}-server.js`),
        clientPath = path.resolve(prepackPath, `${key}-client.js`);

    await fse.outputFileSync(appPath, appContent, {
        encoding: 'utf-8'
    });

    await fse.outputFileSync(serverPath, serverContent, {
        encoding: 'utf-8'
    });

    await fse.outputFileSync(clientPath, clientContent, {
        encoding: 'utf-8'
    });
};

const prepack = async () => {
    return glob
        .sync(path.resolve(src, './pages/**/index.vue'))
        .forEach(async entry => {
            let key = entry.split('/').slice(-2, -1)[0];
            await writeSSRFile(key);
        });
};

prepack();

module.exports = prepack;
