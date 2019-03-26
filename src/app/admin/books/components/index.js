import Vue from  'vue'

export const Books = Vue.component('books-page', require('./Index.vue').default)
export const NewBooks = Vue.component('new-book', require('./NewBook').default)