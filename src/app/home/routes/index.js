import {HomePage, BookPage} from '../components'


export default [
  {
    path: '/',
    component: HomePage,
    name: 'home-page',
    meta: {
      guest: true,
      needsAuth: false
    }
  },
  
  {
    path: '/book/:slug',
    component: BookPage,
    name: 'book-page',
    meta: {
      guest: true,
      needsAuth: false
    }
  }
]