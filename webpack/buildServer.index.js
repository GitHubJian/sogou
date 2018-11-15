const dllBuild = require('./dllBuild');
const buildSSR = require('./buildServer');

function log(str) {
    console.log(`${'='.repeat(10)} ${str} ${'='.repeat(10)}`);
}

(async function() {
    log('Dll 打包开始');
    await dllBuild();
    log('Dll 打包结束');

    log('资源打包开始');
    await buildSSR();
    log('资源打包结束');
})();
