<template>
    <v-layout row>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn outline color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <h6 class="title">Upload Image</h6>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-alert :value="true" outline color="error" icon="warning" v-if="errors.root">
                                    {{ errors.root[0] }}
                                </v-alert>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                        label="Title*"
                                        :error-messages="titleErrors"
                                        required
                                        v-model="title"
                                        @input="$v.title.$touch()"
                                        @blur="$v.title.$touch()"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select
                                        :items="books"
                                        :error-messages="bookErrors"
                                        item-text="title"
                                        item-value="id"
                                        v-model="book"
                                        label="Select book"
                                        @input="$v.book.$touch()"
                                        @blur="$v.book.$touch()"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12>
                                <input
                                    type="file"
                                    ref="gallery_image"
                                    @change="addGalleryImage"
                                >
                            </v-flex>
                            <small v-if="errors.image">{{ errors.image[0] }}</small>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
    import {mapActions, mapGetters } from 'vuex'
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    export default  {
      name: 'new-image',
      mixins: [validationMixin],
      validations: {
        title: { required },
        book: { required },
        image: { required }
      },
      data () {
        return {
            dialog: false,
            title: '',
            book: '',
            image: ''
        }
      },
      computed: {
        ...mapGetters({
          errors: 'getValidationErrors',
          books: 'book/books'
        }),
        titleErrors () {
          const errors = []
          if (!this.$v.title.$dirty) return errors
          !this.$v.title.required && errors.push('Title field is required.')
          this.errors.title && errors.push(this.errors.title ? this.errors.title[0] : null)
          return errors
        },
        bookErrors () {
          const errors = []
          if (!this.$v.book.$dirty) return errors
          !this.$v.book.required && errors.push('Book field is required.')
          this.errors.book && errors.push(this.errors.book ? this.errors.book[0] : null)
          return errors
        },
        imageErrors () {
          const errors = []
          if (!this.$v.image.$dirty) return errors
          !this.$v.image.required && errors.push('Image field is required.')
          this.errors.image && errors.push(this.errors.image ? this.errors.image[0] : null)
          return errors
        }
      },
      methods: {
        ...mapActions({
          getBooks: 'book/getBooks',
          addImage: 'image/addImage',
          snackbar: 'setSnackBar',
        }),
        addGalleryImage() {
          this.image = this.$refs.gallery_image.files[0]
        },
        submit () {
          this.$v.$touch()
          if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
          } else {
            let formData = new FormData()

            formData.append('title', this.title)
            formData.append('book', this.book)
            formData.append('image', this.image)

            this.addImage(formData)
              .then(() => {
                this.snackbar({
                  status: true,
                  color: 'success',
                  text: 'Successfully uploaded image'
                })
                this.dialog = false
              })
          }
        }
      },
      created () {
        this.getBooks()
      }
    }
</script>

<style scoped>

</style>