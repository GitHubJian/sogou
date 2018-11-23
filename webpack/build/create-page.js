const pathConfig = require('config').get('path');
const projectConfig = require('config').get('project');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
const Mustache = require('mustache');

function createPage(folder) {
    if (typeof folder !== 'string') {
        return console.warn(`[create-page]: folder must be string`);
    }

    try {
        glob.sync(pathConfig.template + '/page/**')
            .filter(v => {
                let stat = fs.statSync(v);
                return !stat.isDirectory();
            })
            .forEach(v => {
                let filepath = v.slice((pathConfig.template + '/page').length);
                let targetfile = path.join(
                    pathConfig.pages,
                    `./${folder}`,
                    `./${filepath}`
                );
                if (filepath === '/config.js') {
                    let config = fse.readFileSync(v, 'utf-8');
                    let content = Mustache.render(config, {
                        project: projectConfig.name,
                        folder
                    });
                    fse.outputFile(targetfile, content, 'utf-8');
                } else {
                    fse.ensureFileSync(targetfile);
                    fse.copyFileSync(v, targetfile);
                }
            });
    } catch (e) {
        console.error(e);
    }
}

createPage('test22');

module.exports = createPage;
