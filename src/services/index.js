import * as user from './user.js';

let service = [user].reduce((prev, cur) => {
    Object.assign(prev, { ...cur });

    return prev;
}, {});

let vue;

const install = (Vue, opts = {}) => {
    Vue.prototype.$services = service;
};

export default { install };
