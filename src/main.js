// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
// import './mock/mockServer'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueLazyload, {
  loading: '@/assets/img/loading.gif'
})
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
