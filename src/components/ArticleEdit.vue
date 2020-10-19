<template>
<div class="col-6" @submit.prevent="submitHandler" > <h3 class="state__title">Изменить запись</h3>
<form>
   <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1" ref="select" v-model="current">
      <option
        v-for="c of articles"
        :key="c.id"
        :value="c.id"
      >{{c.title}}</option>
    </select>
  </div>
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
  <button type="submit" class="btn btn-primary">Изменить</button>
</form>
</div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
/* eslint-disable */
export default {
  props: {
  	articles: {
  		type: Array,
  		required: true
  	}
  },
  data: () => ({
  	select: null,
  	title: '',
  	describe: '',
  	link: '',
  	photo: '',
  	dateedit: '',
  	current: null
  }),
  validations: {
  	title: { required },
  	describe: { required },
  	link: { required },
  	photo: { required }
  },
  watch: {
  	current(catId){
  		const {title, describe, link, photo} = this.articles.find(c => c.id === catId)	
  		this.title = title
  	this.describe = describe
  	this.link = link
  	this.photo = photo
  	}
  },
  created() {
  	const {id, title, describe, link, photo} = this.articles[0]
  	this.current = id
  	this.title = title
  	this.describe = describe
  	this.link = link
  	this.photo = photo
  },
  methods: {
async submitHandler() {
  		if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try{
      	const articleData = {
      		id: this.current,
      		title: this.title,
      		describe: this.describe,
      		link: this.link,
      		photo: this.photo,
      		dateedit: new Date().toJSON()
      	}
      	await this.$store.dispatch('updateArticle', articleData)
      	alert('Статья обновленна')
      	this.$emit('updated', articleData)

      } catch (e) {}
  }
  },
  name: 'ArticleEdit',
  destroyed() {
  	if (this.select && this.select.destroy) {
  		this.select.destroy()
  	}
  }
}
</script>
