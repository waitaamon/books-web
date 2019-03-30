<template>
    <authenticated-page v-if="authenticated"></authenticated-page>
    
    <not-authenticated v-else></not-authenticated>
</template>

<script>
import { mapGetters } from "vuex"
import AuthenticatedPage from './components/AuthenticatedPage'
import NotAuthenticated from './components/NotAuthenticated'
export default {
  name: 'app',
  components:{
    AuthenticatedPage,
    NotAuthenticated
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  }

}
</script>

