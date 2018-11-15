function createInstance() {
    const cookies = document.cookie
        .split('; ')
        .filter(v => v)
        .reduce((prev, cur) => {
            const [k, v] = cur.split('=');
            prev[k] = decodeURIComponent(v);
            return prev;
        }, {});

    return {
        get(key) {
            return key ? cookies[key] : cookies;
        }
    };
}

export default createInstance;
