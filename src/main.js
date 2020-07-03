import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

import App from './App';
import router from './router/index'


// 引入axios，并加到原型链中
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;




Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el:'#app',store,
  router,
  render:h=>h(App)
});

