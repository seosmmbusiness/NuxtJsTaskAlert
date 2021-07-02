<!-- Please remove this file from your project -->
<template>
  <div class="my-8 mx-2 text-center bg-white overflow-hidden shadow sm:rounded-lg p-6">
    <h2 class="text-2xl leading-7 font-semibold">
      Welcome
    </h2>

    <p class="mt-3 text-gray-600">
      Welcome click Login to proceed
    </p>

    <p class="flex justify-center mt-4 pt-4 text-gray-800 border-t border-dashed">
      <button class='border-2 w-auto px-4 py-2' @click='loginAction()'>Generate New User Id</button>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
      ...mapActions(['loginAction']),
    },
}
</script>