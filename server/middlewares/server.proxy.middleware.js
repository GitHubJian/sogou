const {
    pathConfig: { serverProxyConfig }
} = require('./../config');
const fs = require('fs');
const path = require('path');
// const { NODE_SERVER_PROXY } = process.env;
const axios = require('axios');
const { NODE_ENV } = process.env;
const [isDevelopment] = [NODE_ENV === 'development'];

async function proxy(ctx, next) {
    try {
        if (!isDevelopment) {
            return next();
        }
        const reqPath = ctx.path;

        let isExists = fs.existsSync(serverProxyConfig);
        if (!isExists) {
            console.info('server.proxy.config.js is not found in root');
            return next();
        }
        const proxyObject = require(serverProxyConfig);

        // if (!NODE_SERVER_PROXY || !proxyFile[NODE_SERVER_PROXY]) {
        //     return next();
        // }

        // const proxyObject = proxyFile[NODE_SERVER_PROXY];

        let keys = Object.keys(proxyObject);

        if (keys.length === 0) {
            return next();
        }

        if (!keys.some(v => reqPath.startsWith(v))) {
            return next();
        }

        let prefixs = keys
            .filter(v => {
                return reqPath.startsWith(v);
            })
            .sort((a, b) => {
                return a.length < b.length;
            })
            .map(v => {
                let fn = proxyObject[v];
                let res = fn.call(null, reqPath);
                return res;
            })
            .filter(v => v);

        if (prefixs.length === 0) {
            return next();
        }
        let url_prefix = prefixs[0];

        let proxy_url = url_prefix + reqPath;

        let data;
        if (ctx.method === 'get') {
            data = ctx.params;
        } else if (ctx.method === 'post') {
            data = ctx.req.body;
        }

        // const res = await axios({
        //     method: ctx.method,
        //     url: proxy_url,
        //     data: data
        // });

        console.log(proxy_url);

        ctx.body = res;
    } catch (e) {
        ctx.body = e;
    }
}

module.exports = config => {
    return proxy(ctx, next);
};
