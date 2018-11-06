import * as user from './user.js';
import * as gen from './gen.js';

let service = [user, gen].reduce((prev, cur) => {
    Object.assign(prev, { ...cur });

    return prev;
}, {});

const install = (Vue, opts = {}) => {
    Vue.prototype.$services = service;
};

export default { install };
