<template>
    <div>
      
        <div :class="[typeClass, hideNotification? 'hidden': 'block']" class="relative py-3 pl-4 pr-10 my-2 mx-3 leading-normal rounded-lg text-sm " role="alert">
            <p>{{ notification.message }}</p>
            <span  class="absolute inset-y-0 right-0 flex items-center mr-4" @click="closeNotification()">
            <svg class="w-4 h-4 fill-current" role="button" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
            </span>
        </div>
        <audio autoplay>
        
        <source :src="require('@/assets/audio/notification.mp3').default" type="audio/mpeg" />
        </audio>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {

  props: {
        notification: {
            type: Object,
            default: () => {return { color: 'green', message: 'Simple Notification' } }
            }
        },    

  data() {
    return {
      timeout: null,
      hideNotification:false
    };
  },
  computed: {
    typeClass() {
      return `bg-${this.notification.color}-100 text-${this.notification.color}-900`;
    },
     
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification);
    }, 15000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {...mapActions({
      removeNotification: 'notification/removeNotification',
    }),
    closeNotification() {
        this.hideNotification =true
    }
  }
};
</script>