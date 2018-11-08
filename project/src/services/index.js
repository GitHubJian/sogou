/**
 * Project's Api
 */
import * as test from './test.js';

const apis = [test];

const service = apis.reduce((prev, cur) => {
    Object.assign(prev, { ...cur });

    return prev;
}, {});

const install = (Vue, opts = {}) => {
    Vue.prototype.$services = service;
};

export default {
    install
};
