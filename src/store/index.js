import Vue from 'vue'
import { ref, computed } from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
  },
  plugins: [createPersistedState()]
})
