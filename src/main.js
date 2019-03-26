require('./bootstrap')
require('./interceptors')
import router from './router'
import store from './store'
import localforage from 'localforage'

localforage.config({
  
  driver: localforage.LOCALSTORAGE,
  storeName: 'blacbooks'
  
})

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

store.dispatch('auth/setToken')
  .then(() => {
  
      store.dispatch('auth/fetchUser')
  .catch(() => {
    
    //clear auth
    store.dispatch('auth/clearAuth')
    router.replace({ name: 'login'})
  })
}).catch(() => {
  //clear auth
  store.dispatch('auth/clearAuth')
  
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
