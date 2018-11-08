import Vue from 'vue';
import Vuex from 'vuex';
import El from 'element-ui';
import Zoo from '../zoo';
import 'element-ui/lib/theme-chalk/index.css';
import Service from './services';

Vue.use(Vuex);
Vue.use(Zoo);
Vue.use(El);
Vue.use(Service);

window.Vue = Vue;
