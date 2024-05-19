import { defineStore } from 'pinia'

export const useAuthenticatedStore = defineStore('isAuthenticated', {
  state: () => ({
    authenticated: false
  }),
  getters: {
    getAuthenticated: (state) => state.authenticated
  },
  actions: {
    setAuthenticated(authenticated) {
      this.authenticated = authenticated
    },
    changeAuthenticated() {
      this.authenticated = !this.authenticated
    }
  }
})
