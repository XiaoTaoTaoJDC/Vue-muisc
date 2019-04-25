import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import state from './state'
import mutations from './mutation'

Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
