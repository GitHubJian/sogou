import qs from 'query-string';

const trimParams = (params = {}) => {
    if (params) {
        Object.entries(params).forEach(([k, v]) => {
            if (typeof v === 'object') {
                trimParams(v);
            } else if (typeof v === 'string') {
                params[k] = v.trim();
            }
        });
    }
};

const toQueryString = body => {
    return qs.stringify(
        Object.keys(body).reduce((prev, cur) => {
            if (body[key] !== undefined) {
                prev[key] = body[key];
            }

            return prev;
        }, {})
    );
};

function toJSON(body) {
    return JSON.stringify(body);
}

function toForm(body) {
    if (body instanceof FormData) {
        return body;
    }

    return Object.keys(body).reduce((prev, cur) => {
        prev.append(k, body[k]);

        return prev;
    }, new FormData());
}

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

function parseRequestOptions(options) {
    const headers = {};
    if (options.headers) {
        headers = options.headers;
        delete options.headers;
    }

    return {
        credentials: 'same-origin',

        headers: {
            ...defaultHeaders,
            ...headers,
            headers
        }
    };
}

function filterStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }

    return res
        .json()
        .then(data => {
            const e = new Error((data && data.msg) || res.statusText);
            if (data && data.code) {
                e.code = data.code;
            }

            return e;
        })
        .catch(() => new Error(res.statusText))
        .then(err => {
            err.type = 'http';
            throw err;
        });
}

function parseJSON(res) {
    return res.json().catch(err => {
        if (err) {
            err.res = res;
        }

        throw err;
    });
}

// 处理错误的返回信息(200)
function filterData(data) {
    if (data) {
        if (data.code === 0) {
            return data.data;
        } else if (!data.code && !data.msg) {
            return data;
        } else if (data.msg) {
            const err = new Error(data.msg);
            err.data = data;
            err.type = 'data';
            throw err;
        }
    } else {
        const err = new Error(data);
        err.data = data;
        err.type = 'data';
        throw err;
    }
}

function wrapRequest(url, opts) {
    if (
        opts.headers['Content-Type'] &&
        opts.headers['Content-Type']
            .toLowerCase()
            .includes('multipart/form-data')
    ) {
        delete opts.headers['Content-Type'];
    }

    let fetchResult = fetch(url, opts);

    fetchResult = fetchResult
        .then(filterStatus)
        .then(parseJSON)
        .then(filterData);

    return fetchResult;
}

export function get({ url, params = {}, options = {} }) {
    const opts = parseRequestOptions(options);
    let urlArr = url.split('?');
    let urlParams = urlArr[1] || '';
    url = urlArr[0];

    try {
        urlParams = qs.parse(urlParams);
    } catch (e) {
        console.error('request: get', urlParams, e);
    }

    trimParams(urlParams);

    url += `?${toQueryString(urlParams)}`;

    const requestArgs = {
        method: 'GET',
        params,
        ...opts
    };

    return wrapRequest(url, requestArgs);
}

export function post({ url, body = {}, options = {} }) {
    const opts = parseRequestOptions(options);
    const contentType = opts.headers['Content-Type'];
    switch (true) {
        case contentType.includes('application/json'):
            trimParams(body);
            body = toJSON(body);
            break;
        case contentType.includes('application/x-www-form-urlencoded'):
            body = toQueryString(body);
            break;
        case contentType.includes('multipart/form-data'):
            body = toForm(body);
            break;
    }

    const requestArgs = {
        method: 'POST',
        body,
        ...opts
    };

    return wrapRequest(url, requestArgs);
}
