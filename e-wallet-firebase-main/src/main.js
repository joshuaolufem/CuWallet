import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import { auth } from './firebase'

Vue.config.productionTip = false

// let app
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       router,
//       store,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
