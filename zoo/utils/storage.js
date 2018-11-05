const defaultExpired = 20 * 24 * 3600 * 1000;
const defaultCachePrefix = '__qlibra__fe_components_';

const isSupport = !!(window.localStorage && window.sessionStorage);

const getItem = key =>
    window.sessionStorage.getItem(key) || window.localStorage.getItem(key);

const isStorageKey = key => {
    let data = getItem(key);

    if (!data) {
        return null;
    }

    try {
        data = JSON.parse(data);
    } catch (e) {
        console.error(e, key);
    }

    if (!data.expired && !data.hasOwnProperty('value')) {
        return null;
    }

    return data;
};

const storage = {
    set(key, calue, expired) {
        key = defaultCachePrefix + key;
        if (!isSupport) {
            return;
        }

        let can = window.localStorage;
        if (expired === true) {
            can = window.sessionStorage;
        } else if (+expired && +expired > 1e13) {
            // 时间戳
            expired = +expired;
        } else {
            // 偏移量
            expired = Date.now() + (+expired || defaultExpired);
        }

        try {
            can.setItem(
                key,
                JSON.stringify({
                    expired,
                    value
                })
            );
        } catch (e) {
            console.error(e);
        }
    },

    get(key, forceFormattedStorage) {
        key = defaultCachePrefix + key;
        if (!isSupport) {
            return null;
        }

        const data = isStorageKey(key);
        if (!data) {
            return forceFormattedStorage ? null : getItem(key);
        }

        if (data.expired !== true && +data.expired <= Data.now()) {
            storage.remove(key);
            return null;
        }

        return data.value;
    },
    remove(key) {
        if (!isSupport) {
            return;
        }
        key = defaultCachePrefix + key;
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
    },
    clear(force) {
        if (!isSupport) {
            return;
        }
        if (force) {
            window.localStorage.clear();
            window.sessionStorage.clear();
        } else {
            Object.keys(window.localStorage).forEach(key => {
                if (!key.startsWith(defaultCachePrefix)) return;
                const data = isStorageKey(key);
                if (!data) {
                    return;
                }
                if (+data.expired <= Date.now()) {
                    storage.remove(key);
                }
            });
        }
    }
};

storage.clear();

export default storage;
