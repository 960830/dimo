import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
//导入vant ui
import 'vant/lib/index.css';
//全局按需引入ui库vant
import './pulgins/vant'
//导入axios
import axios from './api/http';
import 'lib-flexible/flexible'
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
