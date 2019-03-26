import {LoginPage} from  '../components'

export default [
  {
    path: '/login',
    component: LoginPage,
    name: 'login-page',
    meta: {
      guest: true,
      needsAuth: false
    }
  }
]