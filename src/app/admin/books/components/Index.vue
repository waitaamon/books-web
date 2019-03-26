<template>
    <div>
        <v-layout row>
            <v-flex x12>
                <v-btn outline color="indigo" to="/new-book">NEW BOOK</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex x12>
                <v-data-table
                        :headers="headers"
                        :items="books"
                        class="elevation-1"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.text }}</td>
                        <td class="text-xs-right">{{ props.item.author }}</td>
                        <td class="text-xs-right">{{ props.item.publisher }}</td>
                        <td class="text-xs-right">{{ props.item.is_live }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
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