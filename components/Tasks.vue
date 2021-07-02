<!-- Please remove this file from your project -->
<template>
  <div class="my-8 mx-2 text-center bg-white overflow-hidden shadow sm:rounded-lg p-6">
    <h2 class="text-2xl leading-7 font-semibold">
      Welcome, {{getUserData.name}} - {{getUserData.id}}
    </h2>
 
    <p v-if="!getTasks" class="mt-3 text-gray-600">
      No active tasks
    </p>
    <div v-else class="mt-3 text-gray-600">
      <div v-for="getTask in getTasks" :key="getTask.id">
        <Task :task="getTask" />
      </div>
    </div>
    <form id="addNewTask" class="flex flex-col flew-wrap sm:flex-row w-full mt-4 pt-4 text-gray-800 border-t border-dashed" @submit.prevent='sendTask()'>
      <div class="relative border border-gray-400 h-auto sm:w-6/12 my-2 mx-1 w-full flex-grow" >
        <input v-model="note" type="text" class="border-0 h-10 w-full px-2" required placeholder="Enter Task"/>
      </div>
     
      <date-picker v-model="dateTime" format="DD-MM-YYYY, HH:mm:ss" class="border border-gray-400 my-2 mx-1 w-full sm:w-3/12" input-class="border-0 h-10 w-full px-2" :input-attr='{required}' type="datetime" confirm>
      </date-picker>
 
      <button type="submit" form="addNewTask" class='border border-gray-400 my-2 mx-1 w-auto sm:w-2/12 px-4 py-2 w-full'>Add Task</button>
    </form>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import datePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { 
      datePicker, 
      Task:() => import('./Task.vue') 
    },
    data(){
      return {
        required: true,
      }
    },
    computed: {
      ...mapGetters(['getTasks', 'getUserData']),
 
      dateTime: {
        get() {
          return this.$store.state.currentTask.date
        },
        set(value) {
         (value instanceof Date) ? this.$store.commit('SET_currentTaskDateTime', value) : this.$store.commit('SET_currentTaskDateTime',new Date(new Date().setSeconds(60)))
        },
      },

      note: {
        get() {
          return this.$store.state.currentTask.note
        },
        set(value) {
          this.$store.commit('SET_currentTaskNote', value)
        },
      },
    },
 
    mounted(){
      this.$store.commit('SET_currentTaskDateTime',new Date(new Date().setSeconds(60)))
         setInterval(function () {
            this.$store.commit('SET_timer',new Date)
        }.bind(this), 500)
    },

    methods: {

      handleConfirm(date) {
          if (date instanceof Date === false) this.$store.commit('notification/PUSH_Notification', {message: 'Choose correct date', color: 'red',})
        return date
      },
      sendTask() {
        if(this.$store.state.currentTask.date < new Date) {
          window.confirm("The task is in past") ? this.$store.dispatch('submitTask') : this.$store.commit('notification/PUSH_Notification', {message: 'Choose another date', color: 'red',})
        }
        else {
          this.$store.dispatch('submitTask')
          }
      },
    }
}
</script>