const root = process.cwd();
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');

function init(to) {
    //当前文件的跟目录
    const srcRoot = root;
    const dest = path.resolve(root, '..', 'copyTo' + Date.now());
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

init();
