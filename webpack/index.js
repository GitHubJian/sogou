const { checkDllVersion, createDllVersion } = require('./dllVersion');
const dllBuild = require('./dllBuild');
const build = require('./build');

function log(str) {
    console.log(`${'='.repeat(10)} ${str} ${'='.repeat(10)}`);
}

(async function() {
    const isNeedRunDll = checkDllVersion();
    if (!isNeedRunDll) {
        log('Dll 打包开始');
        await dllBuild();
        createDllVersion();
        log('Dll 打包结束');
    } else {
        log('Dll 没有修改不需要打包');
    }

    log('资源打包开始');
    await build();
    log('资源打包结束');
})();
