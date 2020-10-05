import { createStore } from "vuex";

export default createStore({
  state: {
    notifications: []
  },
  mutations: {
    addNotification(state,str) {
      state.notifications.push(str);
    },
    removeFirstNotification(state,str) {
      str;
      state.notifications = state.notifications.slice(0).shift();
    }
  },
  actions: {

  },
  modules: {}
});
