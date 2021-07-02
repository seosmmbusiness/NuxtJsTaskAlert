<template>
    <div class="fixed w-full max-w-4xl bottom-0 inset-x-0 mx-auto">
        <NotificationMessage
            v-for="getNotification in getNotifications"
            :key="getNotification.id"
            :notification="getNotification"
            />
    </div>
</template>

<script>
import { mapState } from "vuex";
import NotificationMessage from "~/components/notificationMessage.vue";

export default {
  components: {
    NotificationMessage
  },
 
  computed: {
    ...mapState({
      getNotifications: state => state.notification.notifications
    }),
  },
};
</script>

<style>

</style>