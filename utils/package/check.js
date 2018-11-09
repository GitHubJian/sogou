const root = process.cwd();
const path = require('path');
const PackageJSON = require('package-json');
const semver = require('semver');

function syncFn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ version: '2.1.1' });
        }, 2000);
    });
}

const getPkgVersion = async name => {
    // let pkgJSON = await PackageJSON('vue');
    let pkgJSON = await syncFn();
    return pkgJSON;
};

const checkUpdate = async () => {
    const { version: currentVersion, name } = require(path.resolve(
        root,
        'package.json'
    ));
    const { version: lastestVersion } = await getPkgVersion(name);
    let isNeedUpdate = semver.lt(currentVersion, lastestVersion);

    return { name, currentVersion, lastestVersion, isNeedUpdate };
};

module.exports = checkUpdate;
