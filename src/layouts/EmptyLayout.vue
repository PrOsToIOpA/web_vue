<template>
  <div>
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error('Что-то пошло не так')
    }
  }
}
</script>