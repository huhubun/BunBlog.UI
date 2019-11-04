import Vue from 'vue'

Vue.directive('highlight', function (el) {
  let elements = el.querySelectorAll('pre code')
  for (let i = 0; i < elements.length; i++) {
    hljs.highlightBlock(elements[i])
  }
})