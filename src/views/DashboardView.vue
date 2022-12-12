<template>
  <div>
      <v-card class="elevation-0">
        <v-toolbar color="pink accent-3" dark flat>
          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
          <v-avatar color="red" class="mr-2">
            <span class="white--text font-weight-bold text-h2">{{ user_name.charAt(0) }}</span>
          </v-avatar>
          <v-toolbar-title class="text-subtitle-1">Howdy {{ user_name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->
          <v-btn icon @click="(dialog = true)">
            <svg-icon type="mdi" :path="icons.mdiLogoutVariant"></svg-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs fixed-tabs background-color="pink accent-3" dark>
        <v-tab href="#dashboard">
          Dashboard
        </v-tab>
        <v-tab-item value="dashboard">
          <div class="d-flex flex-column justify-center align-center mt-12">
            <span class="font-weight-bold blue-grey--text display-1">Under Construction</span>
            <lottie-animation :style='{ "height": "40rem", "width": "40rem" }' :loop="true" :animationData="require('@/assets/lottie/under-construction.json')"/>
          </div>
        </v-tab-item>

        <v-tab href="#screenshots">
          Screenshots
        </v-tab>
        <v-tab-item value="screenshots">
          <screenshots-view />
        </v-tab-item>
      </v-tabs>
      </v-card>
      <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
          </v-card-title>
          <v-card-text>Are you sure to logout?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink accent-3" text @click="logout">
              Yes
            </v-btn>
            <v-btn color="pink accent-3" text @click="(dialog = false)">
              No
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
  import ScreenshotsView from '../views/ScreenshotsView.vue';
  import LottieAnimation from 'lottie-web-vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiLogoutVariant } from '@mdi/js';
  import { deleteCookie } from '../modules/cookie_handler.js';

  export default {
    name: 'DashboardView',
    components: {
      ScreenshotsView,
      LottieAnimation,
      SvgIcon
    },
    data() {
      return {
        tab: null,
        icons: {
          mdiLogoutVariant
        },
        dialog: false,
      }
    },
    computed: {
      user_name(){
        return this.$store.state.user_info.user.name;
      },
    },
    methods: {
      logout(){
        this.dialog = false;
        deleteCookie();
        window.location.replace("/login");
      }
    }
  }
  </script>
<style lang="scss" scoped>
.v-window-item {
  height: 100% !important;
}

.container {
  max-width: 100%;
}
</style>
