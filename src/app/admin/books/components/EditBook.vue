<template>
    <p>Edit book</p>
</template>
<script>
  import {mapActions, mapGetters } from 'vuex'
  export default  {
    name: 'edit-book',
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