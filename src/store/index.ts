
import { defineStore } from 'pinia'
export default defineStore('myGlobalState', {
  state: () => {
    return {
      count: 1,
      message: 'Hello world',
      phone: 13811111199
    }
  },
  actions: {
    countAdd () {
      this.count++
    }
  },
  getters: {
    countSum (state) {
      return state.count * 2
    }
  }

})
