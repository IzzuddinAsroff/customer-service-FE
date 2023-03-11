<template>
  <div>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Logo" class="shrink mr-2" contain :src="logo" transition="scale-transition" width="40" />

        <span>Dashboard</span>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import goodLogo from "../assets/goodLogo.png";
export default {
  data() {
    return {
      logo: goodLogo
    }
  },
  methods: {
  },
}
</script>