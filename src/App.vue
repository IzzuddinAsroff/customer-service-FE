<template>
  <v-app>
    <v-main>
      <app-bar></app-bar>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
export default {
  name: 'App',
  components:{
    AppBar
  },
  data: () => ({
    //
  }),
};
</script>
