<template>
    <p>am here!!</p>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'article-page',
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
      ...mapActions({

      })
    }
  }
</script>

<style scoped>

</style>