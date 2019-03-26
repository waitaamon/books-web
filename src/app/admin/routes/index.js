import { DashboardPage } from '../dashboard/components'
import { Books, NewBooks } from '../books/components'

export default [
  {
    path: '/dashboard',
    component: DashboardPage,
    name: 'dashboard',
    meta: {
      guest: false,
      needsAuth: true
    }
  },
  {
    path: '/books',
    component: Books,
    name: 'books',
    meta: {
      guest: false,
      needsAuth: true
    }
  },
  {
    path: '/new-book',
    component: NewBooks,
    name: 'new-book',
    meta: {
      guest: false,
      needsAuth: true
    }
  }
]