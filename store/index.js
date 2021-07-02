const URL = 'https://europe-west1-st-testcase.cloudfunctions.net'

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
      .$post(URL + '/api/auth')
      .then((res) => {
        commit('SET_login', res)
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
        })
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

  async loadTasks({ commit, state }) {
    await this.$axios
      .$get(URL + '/api/reminders?userId=' + state.login.id)
      .then((res) => {
        commit('SET_activeTasks', res)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },

  async submitTask({ commit, state, dispatch }) {
    commit('SET_loading', true)
    await this.$axios
      .$post(
        URL + '/api/reminders?userId=' + state.login.id,
        JSON.stringify(state.currentTask),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task submitted',
            color: 'green',
          })
        })
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },

  async deleteTask({ commit, state, dispatch }, id) {
    commit('SET_loading', true)
    await this.$axios
      .$delete(URL + '/api/reminders/' + id + '?userId=' + state.login.id)
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task deleted',
            color: 'blue',
          })
        })
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
      })
  },

  async updateTask({ commit, state, dispatch }, task) {
    // await console.log('Updating')
    // commit('SET_activeTasks', [task.taskBody])
    commit('SET_loading', true)
    await this.$axios
      .$put(
        URL + '/api/reminders/' + task.id + '?userId=' + state.login.id,
        JSON.stringify(task.taskBody),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        dispatch('loadTasks').then(() => {
          commit('SET_loading', false)
          commit('notification/PUSH_Notification', {
            message: 'Task updated',
            color: 'blue',
          })
        })
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          commit('notification/PUSH_Notification', {
            message: error.response.data.error,
            color: 'red',
          })
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config)
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
