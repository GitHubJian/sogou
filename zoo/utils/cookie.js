const cookies = document.cookie
    .split('; ')
    .filter(v => v)
    .reduce((prev, cur) => {
        const [k, v] = cur.split('=');
        prev[k] = decodeURIComponent(v);
        return prev;
    }, {});

export default {
    get(key) {
        return key ? cookies[key] : cookies;
    }
};
