/**
 * Created by amon on 8/1/17.
 */

import home from './home/routes'
import auth from './auth/routes'
import admin from './admin/routes'
import errors from './errors/routes'

export default [...home, ...auth, ...admin, ...errors ]