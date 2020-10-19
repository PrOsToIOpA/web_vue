<template>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<div class="container" style="max-width: 600px;justify-content: center;padding: 100px 0;" @submit.prevent="submitHandler">
  <h2>Вход</h2>
  <form class="form-horizontal">
    <div class="form-group">
      <label class="control-label col-xs-3" for="inputEmail">Email:</label>
      <div class="col-xs-9">
        <input type="email" class="form-control" id="inputEmail" placeholder="Email" aria-describedby="emailHelp" v-model.trim="$v.email.$model" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}">
        <small id="emailHelp" class="form-text text-muted"  v-if="$v.email.$dirty && !$v.email.required">Поле не должно быть пустым</small>
        <small id="emailHelp" class="form-text text-muted" v-else-if="$v.email.$dirty && !$v.email.email">Введите корректное значение</small>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-xs-3" for="inputPassword">Пароль:</label>
      <div class="col-xs-9">
        <input type="password" class="form-control" id="inputPassword" placeholder="Введите пароль" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}">
        <small id="passwordHelp" class="form-text text-muted" v-if="$v.password.$dirty && !$v.password.required">Поле не должно быть пустым</small>
        <small id="emailHelp" class="form-text text-muted" v-else-if="$v.password.$dirty && !$v.password.minLength">Минимальная длина 6 символов</small>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-offset-2 col-xs-10">
        <div class="checkbox">
          <label><input type="checkbox"> Запомнить</label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-offset-2 col-xs-12">
        <button type="submit" class="btn btn-primary">Войти</button>
        <router-link to="/register" class="btn btn-secondary">Зарегестрироваться</router-link>
      </div>
    </div>
  </form>
  </div>
</body>
</html>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
      }
    }
  }
}
</script>
