// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
//  解决点击事件延迟
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
