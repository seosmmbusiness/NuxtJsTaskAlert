export const state = () => {
  return {
    notifications: [],
  }
}
export const mutations = {
  PUSH_Notification(state, notification) {
    state.notifications.push({
      ...notification,
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
    })
  },
  REMOVE_Notification(state, notificationToRemove) {
    state.notifications = state.notifications.filter((notification) => {
      return notification.id !== notificationToRemove.id
    })
  },
}
export const actions = {
  addNotification({ commit }, notification) {
    commit('PUSH_Notification', notification)
  },
  removeNotification({ commit }, notification) {
    commit('REMOVE_Notification', notification)
  },
}

export const getters = {
  getNotifications(state) {
    return state.notifications
  },
}
