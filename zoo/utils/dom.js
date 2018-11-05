const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;

const root = window;

const trim = (str = '') => {
    return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

const camelCase = name => {
    return name.replace(SPECIAL_CHARS_REGEXP, function(
        _,
        separator,
        letter,
        offset
    ) {
        return offset ? letter.toUpperCase() : letter;
    });
};

const on = (function() {
    return function(element, event, handler) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    };
})();

const off = (function() {
    return function(element, event, handler) {
        if (element && event) {
            element.removeEventListener(event, handler, false);
        }
    };
})();

function once(el, event, fn) {
    var listener = function() {
        if (fn) {
            fn.apply(this, arguments);
        }

        off(el, event, listener);
    };

    on(el, event, listener);
}

function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.includes(' '))
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.includes(cls);
    } else {
        return (' ' + el.className + ' ').includes(' ' + cls + ' ');
    }
}

function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    let classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;
        if (el.classList) {
        } else if (!hasClass()) {
        }
    }

    if (!el.classList) {
        el.className = curClass;
    }
}

function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        let clsName = classes[i];
        if (!clsName) continue;
        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }

    if (!el.classList) {
        el.className = trim(curClass);
    }
}

const getStyle = function(element, styleName) {
    if (!element || !styleName) return null;

    styleName = camelCase(styleName);
    if (styleName === 'float') {
        styleName = 'cssFloat';
    }
    try {
        var computed = document.defaultView.getComputedStyle(element, '');
        return element.style[styleName] || computed
            ? computed[styleName]
            : null;
    } catch (e) {
        return element.style[styleName];
    }
};

const setStyle = function(element, styleName, value) {
    if (!element || !styleName) return;

    if (typeof styleName === 'object') {
        for (var prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        styleName = camelCase(styleName);
        element.style[styleName] = value;
    }
};

function contains(source, target, deep = true) {
    const walk = parent => {
        const children = parent.childNodes || [];
        let result = false;
        for (let i = 0, j = children.length; i < j; i++) {
            const child = children[i];
            if (child === target || (deep && walk(child))) {
                result = true;
                break;
            }
        }

        return result;
    };

    if (source === target) {
        return true;
    }

    return walk(source);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
    var _display = element.style.display,
        _visibility = element.style.visibility;
    element.style.display = 'block';
    element.style.visibility = 'hidden';
    var calcWidthToForceRepaint = element.offsetWidth;

    // original method
    var styles = root.getComputedStyle(element);
    var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    var result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
    };

    // reset element styles
    element.style.display = _display;
    element.style.visibility = _visibility;
    return result;
}
/**
 * Get CSS computed property of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @argument {String} property
 */

function getStyleComputedProperty(element, property) {
    // NOTE: 1 DOM access here
    var css = root.getComputedStyle(element, null);
    return css[property];
}

/**
 * Returns the offset parent of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent;
    return offsetParent === root.document.body || !offsetParent
        ? root.document.documentElement
        : offsetParent;
}

/**
 * Returns the scrolling parent of the given element
 * @function
 * @ignore
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getScrollParent(element) {
    var parent = element.parentNode;

    if (!parent) {
        return element;
    }

    if (parent === root.document) {
        // Firefox puts the scrollTOp value on `documentElement` instead of `body`, we then check which of them is
        // greater than 0 and return the proper element
        if (root.document.body.scrollTop || root.document.body.scrollLeft) {
            return root.document.body;
        } else {
            return root.document.documentElement;
        }
    }

    // Firefox want us to check `-x` and `-y` variations as well
    if (
        ['scroll', 'auto'].indexOf(
            getStyleComputedProperty(parent, 'overflow')
        ) !== -1 ||
        ['scroll', 'auto'].indexOf(
            getStyleComputedProperty(parent, 'overflow-x')
        ) !== -1 ||
        ['scroll', 'auto'].indexOf(
            getStyleComputedProperty(parent, 'overflow-y')
        ) !== -1
    ) {
        // If the detected scrollParent is body, we perform an additional check on its parentNode
        // in this way we'll get body if the browser is Chrome-ish, or documentElement otherwise
        // fixes issue #65
        return parent;
    }
    return getScrollParent(element.parentNode);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @function
 * @ignore
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
    if (element === root.document.body) {
        return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
    }
    return element.parentNode ? isFixed(element.parentNode) : element;
}

/**
 * Get the position of the given element, relative to its offset parent
 * @function
 * @ignore
 * @param {Element} element
 * @return {Object} position - Coordinates of the element and its `scrollTop`
 */
function getOffsetRect(element) {
    var elementRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        top: element.offsetTop
    };

    elementRect.right = elementRect.left + elementRect.width;
    elementRect.bottom = elementRect.top + elementRect.height;

    // position
    return elementRect;
}

/**
 * Get bounding client rect of given element
 * @function
 * @ignore
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
    var rect = element.getBoundingClientRect();

    // whether the IE version is lower than 11
    var isIE = navigator.userAgent.indexOf('MSIE') != -1;

    // fix ie document bounding top always 0 bug
    var rectTop =
        isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top;

    return {
        left: rect.left,
        top: rectTop,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rectTop
    };
}

/**
 * Given an element and one of its parents, return the offset
 * @function
 * @ignore
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @return {Object} rect
 */
function getOffsetRectRelativeToCustomParent(element, parent, fixed) {
    var elementRect = getBoundingClientRect(element);
    var parentRect = getBoundingClientRect(parent);

    if (fixed) {
        var scrollParent = getScrollParent(parent);
        parentRect.top += scrollParent.scrollTop;
        parentRect.bottom += scrollParent.scrollTop;
        parentRect.left += scrollParent.scrollLeft;
        parentRect.right += scrollParent.scrollLeft;
    }

    var rect = {
        top: elementRect.top - parentRect.top,
        left: elementRect.left - parentRect.left,
        bottom: elementRect.top - parentRect.top + elementRect.height,
        right: elementRect.left - parentRect.left + elementRect.width,
        width: elementRect.width,
        height: elementRect.height
    };
    return rect;
}

/**
 * Get the prefixed supported property name
 * @function
 * @ignore
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase)
 */
function getSupportedPropertyName(property) {
    var prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
        var toCheck = prefixes[i]
            ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1)
            : property;
        if (typeof root.document.body.style[toCheck] !== 'undefined') {
            return toCheck;
        }
    }
    return null;
}

function scrollIntoView(container, selected) {
    if (!selected) {
        container.scrollTop = 0;
        return;
    }

    const offsetParents = [];
    let pointer = selected.offsetParent;
    while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }
    const top =
        selected.offsetTop +
        offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

export default {
    on,
    off,
    once,
    contains
};
