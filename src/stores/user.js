import { defineStore } from 'pinia'

export const useUserStore = defineStore('auth', {
  state: () => ({
    user: {
      username: null,
      email: null,
      token: null
    },
  }),
  getters: {
    getToken: (state) => state.user.token,
    getUsername: (state) => state.user.username,
    getEmail: (state) => state.user.email
  },
  actions: {
    setToken(token) {
      this.user.token = token
    },
    setUsername(username) {
      this.user.username = username
    },
    setEmail(email) {
      this.user.email = email
    },
    removeToken() {
      this.user.token = null
    },
    removeUsername() {
      this.user.username = null
    },
    removeEmail() {
      this.user.email = null
    },
    login_register(data) {
      this.user.username = data.username
      this.user.email = data.email
      this.user.token = data.token
    }
  }
})
