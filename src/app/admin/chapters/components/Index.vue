<template>
    <p>chapters</p>
</template>

<script>
    import { mapActions, mapGetters } from  'vuex'
    export default {
      name: 'all-books',
      data () {
        return {
          headers: [
            {
              text: 'Title',
              align: 'left',
              sortable: false,
              value: 'title'
            },
            { text: 'Author', value: 'author' },
            { text: 'Publisher', value: 'publisher' },
            { text: 'Is Live', value: 'is_live' }
          ]
        }
      },
      computed: {
        ...mapGetters({
          books: 'book/books'
        })
      },
      methods: {
        ...mapActions({
          getBooks: 'book/getBooks'
        })
      },
      created () {
        this.getBooks()
      }
    }
</script>

<style scoped>

</style>