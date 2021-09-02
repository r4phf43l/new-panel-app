import Vue from 'vue'
import axios from 'axios'
import VueSwal from 'vue-swal'
import JsonCSV from 'vue-json-csv'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueSwal)
Vue.component('downloadCsv', JsonCSV)

Vue.filter('trans', (value) => {
  return store.state.dict[value] || value
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.dispatch('loadConfig')
  },
}).$mount('#app')
