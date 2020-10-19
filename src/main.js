import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)
firebase.initializeApp({
  apiKey: 'AIzaSyDJViGRKnU3i-7Iy4Imp1ruHJKsM0Jfxj8',
  authDomain: 'luciku487-a48dd.firebaseapp.com',
  databaseURL: 'https://luciku487-a48dd.firebaseio.com',
  projectId: 'luciku487-a48dd',
  storageBucket: 'luciku487-a48dd.appspot.com',
  messagingSenderId: '636459641609',
  appId: '1:636459641609:web:aed1e67dd3f3e52ade81d8',
  measurementId: 'G-ZGDE4Y917G'
})
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
