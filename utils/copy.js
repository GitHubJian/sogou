const root = process.cwd();
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

let srcArray = __dirname.split('/');
srcArray.pop();
let srcRoot = srcArray.join('/');

function copy(to) {
    //当前文件的跟目录
    const dest = path.resolve(root, '..', to + Date.now());
    fse.copySync(srcRoot, dest, {
        filter: p => {
            return ![
                '.vscode',
                '.DS_Store',
                'node_modules',
                '.git',
                '.temp',
                'static',
                'bin'
            ].some(v => {
                return p.includes(v);
            });
        }
    });
}

module.exports = copy;
