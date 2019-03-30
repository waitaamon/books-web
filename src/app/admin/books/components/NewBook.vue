<template>
    <v-layout row wrap>
        <v-flex xs8 offset-xs2>
            <v-alert :value="true" outline color="error" icon="warning" v-if="errors.root">
                {{ errors.root[0] }}
            </v-alert>
            <form class="pb-2" @submit.prevent="submit" autocomplete="off">
                <v-text-field
                        v-model="title"
                        :error-messages="titleErrors"
                        label="Book title "
                        required
                        @input="$v.title.$touch()"
                        @blur="$v.title.$touch()"
                ></v-text-field>
                <v-layout>
                    <v-flex xs12 sm6 d-flex>
                        <v-text-field
                                v-model="author"
                                :error-messages="authorErrors"
                                label="Book author "
                                required
                                @input="$v.author.$touch()"
                                @blur="$v.author.$touch()"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 d-flex>
                        <v-text-field
                                v-model="publisher"
                                :error-messages="publisherErrors"
                                label="Book publisher "
                                required
                                @input="$v.publisher.$touch()"
                                @blur="$v.publisher.$touch()"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm6 d-flex>
                        <v-select
                                :items="languages"
                                item-text="title"
                                item-value="id"
                                v-model="language"
                                label="Select book language"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 d-flex>
                        <v-select
                                :items="genres"
                                item-text="title"
                                item-value="id"
                                attach
                                chips
                                v-model="genre"
                                label="Select book genre"
                                multiple
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm12 d-flex>
                        <v-select
                                :items="topics"
                                item-text="title"
                                item-value="id"
                                attach
                                chips
                                v-model="topic"
                                label="Select book topics"
                                multiple
                        ></v-select>
                    </v-flex>
                </v-layout>

                <v-btn
                        color="primary"
                        large
                        class="mt-2"
                        type="submit"
                >
                    Save Book
                </v-btn>
            </form>
        </v-flex>
    </v-layout>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: 'new-book',
    mixins: [validationMixin],
    validations: {
      title: { required },
      author: { required },
      language: { required },
      publisher: {  },
    },
    data() {
      return {
        title: '',
        author: '',
        publisher: '',
        language: '',
        genre: [],
        topic: []
      }
    },
    computed: {
      ...mapGetters({
        errors: 'getValidationErrors',
        languages: 'language/languages',
        genres: 'genre/genres',
        topics: 'topic/topics'
      }),
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title field is required')
        this.errors.title && errors.push(this.errors.title ? this.errors.title[0] : null)
        return errors
      },
      languageErrors () {
        const errors = []
        if (!this.$v.language.$dirty) return errors
        !this.$v.language.required && errors.push('Language field is required')
        this.errors.language && errors.push(this.errors.language ? this.errors.language[0] : null)
        return errors
      },
      authorErrors () {
        const errors = []
        if (!this.$v.author.$dirty) return errors
        !this.$v.author.required && errors.push('Author field is required')
        this.errors.author && errors.push(this.errors.author ? this.errors.author[0] : null)
        return errors
      },
      publisherErrors () {
        const errors = []
        if (!this.$v.publisher.$dirty) return errors
        this.errors.publisher && errors.push(this.errors.publisher ? this.errors.publisher[0] : null)
        return errors
      },
    },
    methods: {
      ...mapActions({
        getLanguages: 'language/getLanguages',
        getGenres: 'genre/getGenres',
        getTopics: 'topic/getTopics',
        addBook: 'book/addBook',
        snackbar: 'snackbar'
      }),
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.addBook({
            title: this.title,
            author: this.author,
            publisher: this.publisher,
            language: this.language,
            genre: this.genre,
            topic: this.topic,
          }).then(() => {
            this.snackbar({
              status: true,
              color: 'success',
              text: 'Successfully created a new book'
            })
            this.$router.push({name: 'books'})
          })
        }
      }
    },
    created () {
      this.getLanguages()
      this.getGenres()
      this.getTopics()
    }
  }
</script>

<style scoped>

</style>