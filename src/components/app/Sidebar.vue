<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo">
          <img src="@/components/app/ActiveBox.png" alt="">
        </div>
        <ul class="nav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="nav__link" v-if="name ==='UserName'"> {{ link.title }}</a>
    </router-link>
    <router-link
      v-for="link in linksuser"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="nav__link" v-if="name !=='UserName'"> {{ link.title }}</a>
    </router-link>
  </ul>
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {{name}}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Профиль</a>
    <a class="dropdown-item" href="#" @click.prevent="logout">Выйти</a>
  </div>
</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Главная', url: '/', exact: true },
      { title: 'Авторизация', url: '/login' }
    ],
    linksuser: [
      { title: 'Главная', url: '/', exact: true },
      { title: 'Управление', url: '/articles' },
      { title: 'Настройки', url: '/settings' }
    ],
    dropdown: null
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  computed: {
    name () {
      if (this.$store.getters.info.name) {
        return this.$store.getters.info.name
      } else {
        return 'UserName'
      }
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
