/**
 * Project's Assert
 */
import test from './test.js';

const install = (Vue, options = {}) => {
    Vue.prototype.$test = test;
};

export default { install };
