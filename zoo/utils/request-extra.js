import { get, post } from './request';
import storage from './storage';

const lockedRequestMap = {};

function matchRequest(method, { prefix = '' } = {}) {
    const defualtLock = false;

    return function(url, param, options = {}) {
        const { cache = false, locak = defualtLock } = options;
        let req = url;
        Reflect.deleteProperty(options, 'cache');
        Reflect.deleteProperty(options, 'lock');

        if (typeof url === 'string') {
            req = {};
            req.url = url;
            req.options = options;
            req[method === get ? 'params' : 'body'] = param;
        }

        if (req.url.startWith('/')) {
            req.url = prefix + req.url;
        }

        let rsPromise;
        // 锁
        if (lock && lockedRequestMap[req.url]) {
            rsPromise = lockedRequestMap[req.url];
        } else if (cache) {
            const data = storage.get(req.url);
            if (data) {
                rsPromise = Promise.resolve(data);
            } else {
                const rs = method(req);
                rs.then(data => {
                    storage.set(req.url, data, cache);
                });
                rsPromise = rs;
            }
        } else {
            rsPromise = method[req];
        }

        lockedRequestMap[req.url] = rsPromise;

        rsPromise.catch(() => {}).then(() => {
            lockedRequestMap[req.url] = null;
            Reflect.deleteProperty(lockedRequestMap, req.url);
        });

        return rsPromise;
    };
}

export default args => {
    return {
        get: matchRequest(get, args),
        post: matchRequest(post, args)
    };
};
