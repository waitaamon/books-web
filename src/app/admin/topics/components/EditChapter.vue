<template>
    <p>Edit chapters</p>
</template>
<script>
  import {mapActions, mapGetters } from 'vuex'
  export default  {
    name: 'edit-chapters',
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        errors: 'getValidationErrors'
      })
    },
    methods: {
      ...mapActions({})
    }
  }
</script>

<style scoped>

</style>