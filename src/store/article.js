/* eslint-disable */
import firebase from 'firebase/app'
export default {
	actions: {
		async fetchArticles({ commit, dispatch }) {
			try {
				const uid = await dispatch('getUid')
				const articles = (await firebase.database().ref(`/users/${uid}/articles`).once('value')).val() || { }
				return Object.keys(articles).map(key => ({...articles[key], id: key}))
			} catch (e) {
				alert('Error')
				throw e
			}
		},
		async updateArticle({ commit, dispatch }, { title, describe, link, photo, dateedit, id}) {
			try {
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/articles`).child(id).update({ title, describe, link, photo, dateedit })
			} catch (e) {
				alert('Error')
				throw e
			}
		},
		async createArticle({ commit, dispatch }, { title, describe, link, photo, datecreate, dateedit }) {
			try {
				const uid = await dispatch('getUid')
				const article = await firebase.database().ref(`/users/${uid}/articles`).push({ title, describe, link, photo, datecreate, dateedit })
				return { title, describe, link, photo, datecreate, dateedit, id: article.key }
			} catch (e) {
				alert('Error')
				throw e
			}
		}
	}
}	