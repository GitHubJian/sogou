/**
 * Check Structure
 * @description
 * Detemine if a and b have the same structure,
 * now suport String, Number, Boolean, Object, Array
 * @author xiaowensheng@sogou-inc.com
 */

const _toString_ = Object.prototype.toString;

function isObjectLike(v) {
    return typeof v == 'object' && v !== null;
}

function isString(v) {
    const type = typeof v;
    return (
        type == 'string' ||
        (type == 'object' &&
            v != null &&
            !Array.isArray(v) &&
            _toString_.call(v) == '[object String]')
    );
}

function isNumber(v) {
    return (
        typeof v == 'number' ||
        (isObjectLike(v) && _toString_.call(v) == '[object Number]')
    );
}

function isBoolean(v) {
    return (
        v === true ||
        v === false ||
        (isObjectLike(v) && _toString_.call(v) == '[object Boolean]')
    );
}

function isObject(v) {
    let type = typeof v;
    return v !== null && (type == 'object' || type == 'function');
}

function isArray(v) {
    return Array.isArray(v);
}

function isFunction(v) {
    if (!isObject(v)) {
        return false;
    }

    let tag = _toString_.call(v);
    return (
        tag == '[object Function]' ||
        tag == '[object AsyncFunction]' ||
        tag == '[object GeneratorFunction]' ||
        tag == '[object Proxy]'
    );
}

function isNil(v) {
    return v == null;
}

function isNull(v) {
    return v === null;
}

function isUndefined(v) {
    return v === undefined;
}

function isSymbol(v) {
    const type = typeof v;
    return (
        type == 'symbol' ||
        (type == 'object' &&
            v != null &&
            _toString_.call(v) == '[object Symbol]')
    );
}

function isWeakMap(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object WeakMap]';
}

function isWeakSet(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object WeakSet]';
}

function isDate(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object Date]';
}

function isMap(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object Map]';
}

function isFunction(v) {
    if (!isObject(v)) {
        return false;
    }

    let tag = _toString_.call(v);
    return (
        tag == '[object Function]' ||
        tag == '[object AsyncFunction]' ||
        tag == '[object GeneratorFunction]' ||
        tag == '[object Proxy]'
    );
}

function isSet(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object Set]';
}

function isRegExp(v) {
    return isObjectLike(v) && _toString_.call(v) == '[object RegExp]';
}

/**
 * Check
 *
 * @param {any} a
 * @param {any} b
 */
function check(a, b) {
    if (isString(a)) {
        return isString(b);
    }

    if (isNumber(a)) {
        return isNumber(b);
    }

    if (isBoolean(a)) {
        return isBoolean(b);
    }

    if (isArray(a)) {
        let t = isArray(b);
        if (t) {
            let alen = a.length;
            let blen = b.length;
            return (
                alen === blen &&
                a.every((v, i) => {
                    return check(a[i], b[i]);
                })
            );
        } else {
            return false;
        }
    }

    if (isObject(a)) {
        let t = isObject(b);
        if (t) {
            let akeys = Object.keys(a);
            let bkeys = Object.keys(b);

            return (
                akeys.length === bkeys.length &&
                akeys.every(v => {
                    return check(a[v], b[v]);
                })
            );
        } else {
            return false;
        }
    }

    if (isDate(a)) {
        return isDate(b);
    }

    if (isFunction(a)) {
        return isFunction(b);
    }

    if (isRegExp(a)) {
        return isRegExp(b);
    }
}

// let a = {
//     a: 1,
//     b: '1',
//     c: {
//         a: '1',
//         b: {
//             a: 1
//         }
//     },
//     d: [1, { a: 2 }, '3']
// };

// let b = {
//     a: 1,
//     b: '1',
//     c: {
//         a: '1',
//         b: {
//             a: 1
//         }
//     },
//     d: [1, { a: '3' }, '3']
// };

module.exports = check;
