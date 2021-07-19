import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: '',
    token: localStorage.getItem('token') || '',
    inCart: []
  },
  mutations: {
    SET_USER: (state, user) => state.currentUser = user,
    REMOVE_USER: state => state.currentUser = '',
    ADD_TO_CART: (state, item) => {
      let found = state.inCart.find(item => item.id == item.id)
      if (found) {
        item.addedToCart = true
      } else {
        state.inCart.push(item)
        item.addedToCart = true
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.currentUser,
    inCart: state => state.inCart
  },
  actions: {
    setUser (context, user) {
      context.commit('SET_USER', user)
    },
    logout (context) {
      localStorage.removeItem('token')
      context.commit('REMOVE_USER')
      delete axios.defaults.headers.common['Authorization']
    },
    async addItem (context, item) {
      await context.commit('ADD_TO_CART', item)
    }
  },
  modules: {
  }
})
