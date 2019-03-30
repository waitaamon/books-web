import { HomePage } from '../components'


export default [
  {
    path: '/',
    component: HomePage,
    name: 'home-page',
    meta: {
      guest: true,
      needsAuth: false
    }
  }
]