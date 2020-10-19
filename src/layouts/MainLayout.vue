<template>
  <div class="app-main-layout">
    <Sidebar  />
      <div class="app-page" :class="{full: !isOpen}">
        <router-view />
      </div>

  </div>
</template>

<script>
/* eslint-disable */
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Sidebar
  }
}
</script>
