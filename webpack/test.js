const needCopyDllPath = fs
    .readdirSync(pathConfig.dll)
    .filter(v => {
        const stat = fs.statSync(join(pathConfig.dll, v));
        return stat.isDirectory();
    })
    .map(v => {
        return {
            from: resolve(pathConfig.dll, v),
            to: resolve(pathConfig.static, v)
        };
    });
console.log(needCopyDllPath);