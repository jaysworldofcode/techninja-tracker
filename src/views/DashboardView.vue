<template>
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
</template>
<script>
  import ScreenshotsView from '../views/ScreenshotsView.vue';
  import LottieAnimation from 'lottie-web-vue'

  export default {
    name: 'DashboardView',
    components: {
      ScreenshotsView,
      LottieAnimation
    },
    data() {
      return {
        tab: null,
      }
    },
    computed: {
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
