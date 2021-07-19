import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '',
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    SET_USER: (state, user) => state.currentUser = user,
    REMOVE_USER: (state) => state.currentUser = ''
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.currentUser
  },
  actions: {
    setUser (context, user) {
      context.commit('SET_USER', user)
    },
    logout (context) {
      localStorage.removeItem('token')
      context.commit('REMOVE_USER')
      delete axios.defaults.headers.common['Authorization']
    }
  },
  modules: {
  }
})
