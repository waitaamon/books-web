<template>
    <p>new chapter</p>
</template>
<script>
    import {mapActions, mapGetters } from 'vuex'
    export default  {
      name: 'new-chapter',
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