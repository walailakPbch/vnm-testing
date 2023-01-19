import Vue from 'vue'
import Vuex from 'vuex'
import employee from './module/employee'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {},
 getters: {},
 mutations: {},
 actions: {},
 modules: {
  employee,
 },
})
