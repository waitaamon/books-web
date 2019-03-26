<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="goTo(item)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">Books</v-subheader>
        <v-list>
          <v-list-tile v-for="book in books" :key="book.text" avatar @click="goTo(book)">
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${book.picture}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="book.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile @click="goTo('')">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
            color="red"
            dense
            fixed
            clipped-left
            app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Blac books</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-xl>
        <v-layout row>
            <v-flex x12>
                <router-view></router-view>
                <v-snackbar
                        v-model="snackbar"
                        :color="color"
                        :multi-line="mode === 'multi-line'"
                        :timeout="timeout"
                        :vertical="mode === 'vertical'"
                >
                    {{ text }}
                    <v-btn
                            dark
                            flat
                            @click="snackbar = false"
                    >
                        Close
                    </v-btn>
                </v-snackbar>
            </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String
    },
    data () {
      return {
        drawer: null,
        items: [
          { icon: 'trending_up', text: 'Dashboard', route: 'dashboard' },
          { icon: 'add', text: 'New book', route: 'books' },
          { icon: 'add_a_photo', text: 'Gallery', route: 'gallery' },
          { icon: 'people', text: 'Users', route: 'users' }
        ],
        books: [
          { picture: 28, text: 'Joseph' },
          { picture: 38, text: 'Apple' }
        ]
      }
    },
    computed: {
      snackbar: 'snackbar'
    },
    methods: {
      goTo(item) {
        this.$router.replace({name: item.route})
      }
    }
  }
</script>
