import components from './components';
// import storage from './utils/storage';
import cookie from './utils/cookie';
// import request from './utils/request-extra';
// import dom from './utils/dom';

import './reset.css';

const install = (Vue, options = {}) => {
    components.forEach(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$cookie = cookie;
};

export default {
    install
};
