import { allLenguajes } from '@/lenguages/allLenguajes'
import { defineStore } from 'pinia'

export const useLenguajeStore = defineStore('globalLenguaje', {
  state: () => ({
    lenguaje: allLenguajes.EN
  }),
  getters: {
    getLenguge() {
        return this.lenguaje
    }
  },
  actions: {
    setLenguaje(lenguaje) {
      this.lenguaje = lenguaje
    },
  }
})