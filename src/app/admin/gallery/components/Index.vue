<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <new-image></new-image>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
            <v-flex xs12>
                <v-card>
                    <v-container grid-list-sm fluid>
                        <v-layout row wrap>
                            <v-flex
                                    v-for="image in images"
                                    :key="image.id"
                                    xs3
                                    d-flex
                            >
                                <v-card flat hover tile class="d-flex" @click="imageClicked(image)">
                                    <v-img
                                            :src="image.thumb_url"
                                            :lazy-src="`https://picsum.photos/10/6?image=${image.id * 5 + 10}`"
                                            aspect-ratio="1"
                                            class="grey lighten-2"

                                    >
                                        <template v-slot:placeholder>
                                            <v-layout
                                                    fill-height
                                                    align-center
                                                    justify-center
                                                    ma-0
                                            >
                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-layout>
                                        </template>
                                    </v-img>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Image Details</v-card-title>

                <v-card-text>
                    <h6 class="caption">
                        Title:
                        <v-divider></v-divider>
                        {{ this.image !== null ? this.image.title : '' }}</h6>
                    <v-divider></v-divider>
                    <h6 class="caption">Url:
                        <v-divider></v-divider>
                        {{ this.image !== null ? this.image.url : '' }}</h6>
                    <v-divider></v-divider>
                    <h6 class="caption">Book: {{ this.image !== null ? this.image.book.title : ''}}</h6>

                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="dialog = false"
                    >
                        Disagree
                    </v-btn>

                    <v-btn
                            color="green darken-1"
                            flat="flat"
                            @click="dialog = false"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from  'vuex'
    import NewImage from "./NewImage";
    export default {
      components: {NewImage},
      name: 'all-books',
      data () {
        return {
          dialog: false,
          image: null
        }
      },
      computed: {
        ...mapGetters({
          images: 'image/images'
        })
      },
      methods: {
        ...mapActions({
          getImages: 'image/getImages'
        }),
        imageClicked(image) {
          this.image = image
            this.dialog = true
        }
      },
      created () {
        this.getImages()
      }
    }
</script>

<style scoped>

</style>