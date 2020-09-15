import { createStore } from "vuex";

export default createStore({
  state: {
    notifications: []
  },
  mutations: {
    addNotification(state,str) {
      state.notifications.push(str);
    }
  },
  actions: {

  },
  modules: {}
});
