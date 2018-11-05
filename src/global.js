import Vue from 'vue';
import Zoo from './../zoo';
import El from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Service from './services';

Vue.use(El);
Vue.use(Zoo);
Vue.use(Service);

window.Vue = Vue;
