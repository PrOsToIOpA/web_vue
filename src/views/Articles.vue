<template>
<div class="wrapper">
    <div class="intro">
      <div class="container">
        <div class="intro__inner" >
<div class="container">
  <div class="row">
  <ArticleCreate @created="addNewArticle" />
  <ArticleEdit
  v-if="articles.length"
  :articles="articles"
  :key="articles.length + updateCount"
  @updated= "updateArticles"
  />
  <p v-else class="center">Статей пока нету</p>
  </div>
</div>
        </div>
      </div>
      </div>
    </div>
</template>
<script>
import ArticleCreate from '@/components/ArticleCreate'
import ArticleEdit from '@/components/ArticleEdit'
export default {
  name: 'articles',
  data: () => ({
    articles: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.articles = await this.$store.dispatch('fetchArticles')
    this.loading = false
  },
  components: {
    ArticleCreate, ArticleEdit
  },
  methods: {
    addNewArticle (article) {
      this.articles.push(article)
    },
    updateArticles (article) {
      const idx = this.articles.findIndex(c => c.id === article.id)
      this.articles[idx].title = article.title
      this.articles[idx].describe = article.describe
      this.articles[idx].link = article.link
      this.articles[idx].photo = article.photo
      this.updateCount++
    }
  }
}
</script>
