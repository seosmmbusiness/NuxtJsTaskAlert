<template>
  <div class="relative bg-gray-100">
    <div class="relative flex flex-col items-center justify-center min-h-screen">
      <img :src="require('@/assets/logo.svg')" width='50' height="40"/>
      <div class="w-full max-w-4xl">
        <Welcome v-if="!getUserData.logged" />
        <Tasks v-if="getUserData.logged" />
      </div>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="transition duration-100 ease-in-out opacity-0"
      enter-to-class="opacity-100"
      leave-class=" opacity-100"
      leave-active-class="transition duration-300 ease-in-out"
      leave-to-class="opacity-0">

      <Loading v-if="getLoading"/>
    </transition>

    <NotificationsList />

  </div>
</template>

<script>
import {  mapGetters } from 'vuex'
import Loading from '~/components/Loading.vue'
import Welcome from '~/components/Welcome.vue'
import Tasks from '~/components/Tasks.vue'
import NotificationsList from "~/components/notificationList.vue";

export default {
  components: { Tasks, Welcome, Loading, NotificationsList},
  computed: {
    ...mapGetters({
      getUserData: 'getUserData',
      getLoading: 'getLoading',
    }),
  },
}
</script>
