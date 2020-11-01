<template>
  <div>
    <app-header v-if="userToken"></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from "./shared/Header.vue";
export default {
  computed: {
    userToken() {
      return this.$store.getters.getUserToken;
    }
  },
  components: {
    appHeader
  }
};
</script>
