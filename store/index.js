export const state = () => {
  return {
    login: { id: null, name: '' },
    tasks: [],
    loading: false,
    currentTask: {
      note: '',
      date: '',
    },
    timer: '',
  }
}

export const mutations = {
  SET_login(state, payload) {
    state.login = payload
  },
  SET_loading(state, payload) {
    state.loading = payload
  },
  SET_currentTaskDateTime(state, payload) {
    state.currentTask.date = payload
  },
  SET_currentTaskNote(state, payload) {
    state.currentTask.note = payload
  },
  SET_currentTaskId(state, payload) {
    state.currentTask.note = payload
  },
  SET_activeTasks(state, payload) {
    state.tasks = payload
  },
  SET_timer(state, payload) {
    state.timer = payload
  },
}

export const actions = {
  async loginAction({ state, commit, dispatch }) {
    commit('SET_loading', true)
    await this.$axios
      .$post('https://europe-west1-st-testcase.cloudfunctions.net/api/auth')
      .then((res) => {
        commit('SET_login', res)
      })
      .catch((error) => {
        if (error.response) {
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
        }
      })
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
        })
      })
  },

  async loadTasks({ commit, state }) {
    await this.$axios
      .$get(
        'https://europe-west1-st-testcase.cloudfunctions.net/api/reminders?userId=' +
          state.login.id
      )
      .then((res) => {
        commit('SET_activeTasks', res)
      })
      .catch((error) => {
        if (error.response) {
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
        }
      })
  },

  async submitTask({ commit, state, dispatch }) {
    commit('SET_loading', true)
    await this.$axios
      .$post(
        'https://europe-west1-st-testcase.cloudfunctions.net/api/reminders?userId=' +
          state.login.id,
        JSON.stringify(state.currentTask),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
        }
      })
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task submitted',
            color: 'green',
          })
        })
      })
  },

  async deleteTask({ commit, state, dispatch }, id) {
    commit('SET_loading', true)
    await this.$axios
      .$delete(
        'https://europe-west1-st-testcase.cloudfunctions.net/api/reminders/' +
          id +
          '?userId=' +
          state.login.id
      )
      .catch((error) => {
        if (error.response) {
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
        }
      })
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task deleted',
            color: 'blue',
          })
        })
      })
  },

  async updateTask({ commit, state, dispatch }, task) {
    // await console.log('Updating')
    // commit('SET_activeTasks', [task.taskBody])
    commit('SET_loading', true)
    await this.$axios
      .$put(
        'https://europe-west1-st-testcase.cloudfunctions.net/api/reminders/' +
          task.id +
          '?userId=' +
          state.login.id,
        JSON.stringify(task.taskBody),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .catch((error) => {
        if (error.response) {
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
        }
      })
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task updated',
            color: 'blue',
          })
        })
      })
  },
}

export const getters = {
  getUserData(state) {
    if (state.login.id !== null) return { logged: true, ...state.login }
    return { logged: false }
  },
  getLoading(state) {
    return state.loading
  },

  getTasks(state) {
    if (state.tasks.length === 0) return false

    return state.tasks.slice().sort(function (a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  },
}
