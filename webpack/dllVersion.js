const { entry } = require('./webpack.dll.config');
const fse = require('fs-extra');
const fs = require('fs');
const { dllVersion } = require('config').get('path');

const getDllPkgsVersion = () => {
    const dllPkgs = Object.values(entry).reduce((prev, cur) => {
        prev.push(...cur);
        return prev;
    }, []);

    const dllPkgsVersion =
        dllPkgs.reduce((prev, cur) => {
            let key = cur.split('/').filter(v => v)[0];

            prev[key] = require(`${key}/package.json`).version;
            return prev;
        }, {}) || {};

    return dllPkgsVersion;
};

const createDllVersion = () => {
    const version = getDllPkgsVersion();

    fse.writeJsonSync(dllVersion, version, { encoding: 'utf-8', space: 4 });
};

const getDllVersion = () => {
    if (!fs.existsSync(dllVersion)) {
        return {};
    } else {
        return fse.readJsonSync(dllVersion, { encoding: 'utf-8' });
    }
};

const isSame = (a, b) => {
    let akeys = Object.keys(a),
        bkeys = Object.keys(b);

    return akeys.length === bkeys.length && akeys.every(v => a[v] === b[v]);
};

const checkDllVersion = () => {
    const currentVersion = getDllPkgsVersion();
    const lastVersion = getDllVersion();

    return isSame(currentVersion, lastVersion);
};

module.exports = {
    getDllPkgsVersion,
    createDllVersion,
    getDllVersion,
    checkDllVersion
};
