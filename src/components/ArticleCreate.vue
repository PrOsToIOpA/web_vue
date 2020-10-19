<template>
<div class="col-6" @submit.prevent="submitHandler"> <h3 class="state__title">Добавить запись</h3>
<form>
  <div class="form-group">
    <label for="exampleInputTitle">Название</label>
    <input type="text" class="form-control" id="xampleInputTitle" aria-describedby="emailHelp" v-model.trim="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
    <small id="titleHelp" class="form-text text-muted"  v-if="$v.title.$dirty && !$v.title.required">Поле не должно быть пустым</small>
  </div>
  <div class="form-group">
    <label for="exampleInputDescribe">Описание</label>
    <input type="textarea" class="form-control" id="exampleInputDescribe" aria-describedby="emailHelp" v-model.trim="describe" :class="{invalid: $v.describe.$dirty && !$v.describe.required}">
    <small id="describeHelp" class="form-text text-muted"  v-if="$v.describe.$dirty && !$v.describe.required">Поле не должно быть пустым</small>
  </div>
  <div class="form-group">
    <label for="exampleInputLinkArticle">Ссылка на статью</label>
    <input type="text" class="form-control" id="exampleInputLinkArticle" aria-describedby="emailHelp" v-model.trim="link" :class="{invalid: $v.link.$dirty && !$v.link.required}">
    <small id="linkarticleHelp" class="form-text text-muted"  v-if="$v.link.$dirty && !$v.link.required">Поле не должно быть пустым</small>
  </div>
  <div class="form-group">
    <label for="exampleInputLinkPhoto">Ссылка на Фото</label>
    <input type="text" class="form-control" id="exampleInputLinkPhoto" aria-describedby="emailHelp" v-model.trim="photo" :class="{invalid: $v.photo.$dirty && !$v.photo.required}">
    <small id="linkphotoHelp" class="form-text text-muted"  v-if="$v.photo.$dirty && !$v.photo.required">Поле не должно быть пустым</small>
  </div>
  <button type="submit" class="btn btn-primary">Добавить</button>
</form> </div>
</template>
<script>
/* eslint-disable */
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ArticleCreate',
  data: () => ({
  	title: '',
  	describe: '',
  	link: '',
  	photo: '',
    dateсreate: '',
    dateedit: ''
  }),
  validations: {
  	title: { required },
  	describe: { required },
  	link: { required },
  	photo: { required }
  },
  methods: {
  	async submitHandler() {
  		if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
       const article = await this.$store.dispatch('createArticle', {
       	title: this.title,
       	describe: this.describe,
       	link: this.link,
       	photo: this.photo,
        datecreate: new Date().toJSON(),
        dateedit: new Date().toJSON()
       })
       this.title = '',
  	   this.describe = '',
  	   this.link = '',
  	   this.photo = ''
  	   this.$v.$reset()
  	   alert('Статья создана')
  	   this.$emit('created', article)
      } catch (e) {

      }
  	}
  }
}
</script>
