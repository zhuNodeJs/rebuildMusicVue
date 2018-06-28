// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/scss/index.scss'
// 启动vconsole
require('@/tools/vconsole')

// 消除移动浏览器300ms延迟
// import attachFastClick from 'fastclick'
// attachFastClick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('common/img/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
