<template>
    <v-container class="d-flex justify-center align-center">
      <v-layout>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
                <!-- <v-flex>
                  <v-img :alt="platformName" class="ml-3" contain height="48px" position="center right" src="https://www.mobygames.com/images/i/12/25/1435075.png"></v-img>
                </v-flex> -->
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your email and password</p>
              <v-form>
                <v-text-field outline label="Username" type="text" v-model="email"></v-text-field>
                <v-text-field outline hide-details label="Password" type="password" v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="py-4">
              <v-spacer></v-spacer>
              <v-btn color="pink accent-3" class="white--text" block :large="$vuetify.breakpoint.smAndUp" @click="login">
                <v-progress-circular v-if="isLoading" :size="20" color="white" class="mr-2" indeterminate></v-progress-circular>
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    <v-snackbar v-model="showSnackbar">
      <span>{{ snackbarMessage }}</span>
      <template>
        <v-btn color="red" text @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </v-container>
</template>
<script>
  import Login from '../modules/repository/login_repository.js';
  import { setCookie } from '../modules/cookie_handler.js';

  export default {
    name: 'login-view',
    data(){
        return {
            darkTheme: true,
            platformName: 'TechNinja Employee Tracker',
            password: null,
            email: null,
            isLoading: false,
            showSnackbar: false,
            snackbarMessage: ''
        }
    },
    components: {
    },
    computed: {
    },
    methods: {
      async login(){
        if(this.email && this.password){
          this.isLoading = true;
          const login = await new Login(this.email, this.password).start();

          if(login.error){
            this.snackbarMessage = login.error;
            this.showSnackbar = true;
          }else{
            setCookie(JSON.stringify(login.data), 9999);
            window.location.replace("/");
          }

          console.log(login);
          this.isLoading = false;
        }
      }
    },
  }
  </script>
<style lang="scss" scoped>
.v-btn,
.v-card {
  border-radius: 4px;
}
.v-card__title {
  text-transform: uppercase;
}

</style>
