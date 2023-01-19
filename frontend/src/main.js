import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
 router,
 store,
 render: (h) => h(App),
}).$mount('#app')
