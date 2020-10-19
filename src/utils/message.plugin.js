/* eslint-disable */
export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      alert('Error')
    }

    Vue.prototype.$error = function(html) {
      alert('Error')
    }
  }
}
