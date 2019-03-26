<template>
    <v-container fluid grid-list-xl>
        <v-layout row wrap>
            <v-flex xs4 offset-xs4 class="align-content-center">
                <img src="@/assets/images/books.svg" alt="Blac book Login">
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs4 offset-xs4>
                <v-alert :value="true" outline color="error" icon="warning" v-if="errors.root">
                    {{ errors.root[0] }}
                </v-alert>
                <form class="pb-2" @submit.prevent="onSubmit" autocomplete="off">
                    <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="E-mail "
                            required
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            :error-messages="passwordErrors"
                            label="Password "
                            type="password"
                            required
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()"
                    ></v-text-field>
                    <v-btn
                            color="primary"
                            large
                            class="mt-2"
                            type="submit"
                    >
                        Login
                    </v-btn>
                    <a href="#" class="right mt-3">forgot password?</a>
                </form>
                <v-divider></v-divider>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import { mapActions, mapGetters } from 'vuex'
  import { isEmpty } from 'lodash'
  import localforage from 'localforage'

  export default {
    name: 'login-page',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: { required }
    },
    data () {
      return {
          email: '',
          password: ''
      }
    },
    computed: {
      ...mapGetters({
            errors: 'getValidationErrors'
      }),
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        this.errors.email && errors.push(this.errors.email ? this.errors.email[0] : null)
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
    },
    methods: {
      ...mapActions({
        login: 'auth/login'
      }),
      onSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.login({
            email: this.email,
            password: this.password
          }).then(() => {
            this.$router.push({name: 'dashboard'})
          })
        }
      }
    },
    mounted () {
      if (this.$store.getters['auth/isUserAuthenticated']) {
        this.$store.commit('auth/loading', true)
        setTimeout(() => {
          localforage.getItem('userType').then((type) => {
            localforage.getItem('intended').then((path) => {
              if (isEmpty(path)) {
                switch (type) {
                  case 'admin':
                    this.$router.push({name: 'AdminDashboard'})
                    break
                  case 'corporate':
                    this.$router.push({name: 'CorporateDashboard'})
                    break
                  case 'partner':
                    this.$router.push({name: 'PartnerDashboard'})
                    break
                }
                return
              }
              this.$router.replace({ path: path })
            })
          })
        }, 1000)
      }
    }
  }
</script>

<style scoped>
    img {
        width: 50%;
        transform: rotate(25deg);
    }
    a {
        text-decoration: none;
    }
</style>
