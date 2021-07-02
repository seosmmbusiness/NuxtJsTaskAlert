<template>
    <div>
        <div v-if='!editable'>
            <div class="flex flex-col flew-wrap sm:flex-row w-full items-center align-center text-gray-800 border-t ">
                <div class="sm:w-6/12 my-2 mx-1 px-4 py-2 w-full h-auto px-2" :class="[ new Date(task.date) < new Date(this.$store.state.timer) ? 'text-red-500': '']" >{{task.note}}</div>
                <div class="sm:w-4/12 my-2 mx-1 px-4 py-2 w-full h-10 px-2" :class="[ new Date(task.date) < new Date(this.$store.state.timer) ? 'text-red-500': '']">{{new Date(task.date).toLocaleString("ru-RU")}}</div>
                <div class="flex flex-row flew-wrap">
                    <button class='p-2' @click="startEdit(task)">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="32" height="32" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7l15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" fill="#626262"/></svg>
                    </button>
                    <button class='p-2' @click="deleteTask(task.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="32" height="32" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" fill="#626262"/></svg>
                    </button>
                </div>
 
            </div>
        </div>
        <div v-else >
            <form :id='task.id' class="flex flex-col flew-wrap sm:flex-row w-full text-gray-800 border-t items-center" @submit.prevent='finishEdit(task.id)'>
                <div class="relative border border-gray-400 h-auto sm:w-6/12 my-2 mx-1 w-full flex-grow" >
                    <input v-model="taskBody.note" type="text" class="border-0 h-10 w-full px-2" required placeholder="Enter Task"/>
                </div>
                <date-picker :default-value="taskBody.date" :value="taskBody.date"  class="border border-gray-400 my-2 mx-1 w-full sm:w-3/12" input-class="border-0 h-10 w-full px-2" :input-attr='{required}' type="datetime" placeholder="Choose a date"  confirm format="DD-MM-YYYY, HH:mm:ss" @change="updateTime" ></date-picker>
                <div class="flex flex-row flew-wrap">
                    <button type="submit" class='p-2 h-12 transition duration-500 ease-in-out hover:bg-green-100' >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="32" height="32" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" fill="#047857" viewBox="0 0 1024 1024"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" fill="fillCollor"/></svg>
                    </button>
                    <button class='p-2 h-12 transition duration-500 ease-in-out hover:bg-red-100' @click="editable = !editable">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="32" height="32" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" fill="#b91c1c" viewBox="0 0 24 24"><g fill="none"><path d="M15 15L9 9m6 0l-6 6" stroke="#b91c1c" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" stroke="#b91c1c" stroke-width="2"/></g></svg>
                    </button>
                </div>
        </form>
        </div>
        
    </div>
</template>

<script>
import datePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { 
      datePicker,
    },
    props: {
        task: {
            type: Object,
            default: () => {return { id: '0', note: '', date: new Date()}}
            }
        },    

    data(){ 
        return {
            required: true,
            editable: false,
            taskId: '',
            taskBody: { note: '', date: '' },
            cssClassActive:false,
            alarmFired:false
        }
    },
    created() {
        this.$store.watch(
        (state) => state.timer,
            () => {
                if(!this.editable) {
                    if ((new Date(this.task.date) < new Date(this.$store.state.timer)&&!this.alarmFired)) { 
                    this.alarmFired = true
                    setTimeout(()=>{
                        this.$store.commit('notification/PUSH_Notification', {message: 'Task missed: "'+this.task.note+ '" until ' + new Date(this.task.date).toLocaleString("ru-RU"), color: 'red',})
                        
                    },0)
                }
                }
                
            }
        )
    },
  
    methods: {
        startEdit(task) {
            this.taskId = task.id
            this.taskBody= { note: task.note, date: new Date(task.date) }
            this.editable = true
      
        },
        updateTime (value) {
             (value instanceof Date) ? this.taskBody.date=value : this.taskBody.date=new Date(new Date().setSeconds(60))
        },
        finishEdit() {
            if(this.taskBody.date < new Date) {
                window.confirm("The task is in past") ? this.$store.dispatch('updateTask', { id: this.taskId, taskBody:this.taskBody }).then(()=>{
                   setTimeout(()=>{ this.alarmFired = false
                    this.editable = false},0)
                    
                }) : this.$store.commit('notification/PUSH_Notification', {message: 'Choose another date', color: 'red',})
            }
            else {
                this.$store.dispatch('updateTask', { id: this.taskId, taskBody:this.taskBody }).then(()=>{
                    setTimeout(()=>{ this.alarmFired = false
                    this.editable = false},0)
                    
                })
            }
        },
        deleteTask(id) {
            if(window.confirm("Do you really want to delete the task?")) this.$store.dispatch('deleteTask', id)
        }
    }
}
</script>
