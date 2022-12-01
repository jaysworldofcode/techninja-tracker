<template>
  <div id="app">
  <v-app dark>
    <router-view></router-view>
  </v-app>
  </div>
</template>
<script>
export default {
  methods: {
  },
  name: 'App',
  data: () => ({
  }),
}
</script>
<style lang="scss">
//global css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,900&display=swap');

#app {
  font-family: 'Poppins', sans-serif !important;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.shadow-hov:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

.shadow-hov {
  transition: box-shadow .3s;
}
</style>
