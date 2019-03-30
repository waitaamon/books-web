<template>
  <v-app>
    <core-toolbar />

    <core-drawer />

    <core-view />

    <core-footer />
  </v-app>
</template>

<script>
  import CoreToolbar from './partials/core/Toolbar'
  import CoreDrawer from './partials/core/Drawer'
  import CoreView from './partials/core/View'
  import CoreFooter from './partials/core/Footer'
  export default {
    name: 'not-authenticated',
    components: {
      CoreToolbar,
      CoreDrawer,
      CoreView,
      CoreFooter
    },
    data () {
      return {
      //
      }
    }
  }
</script>