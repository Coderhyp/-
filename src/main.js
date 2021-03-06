import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/router'
import './assets/css/global.css'
//导入字体图标
import './assets/css/style.css'
//导入全局样式表
import './assets/css/global.css'

import  axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL='https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
