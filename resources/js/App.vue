<template>
  <div>
    <app-header v-if="userToken"></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from "./shared/Header.vue";
import axios from "axios";
export default {
  computed: {
    userToken() {
      return this.$store.getters.getUserToken;
    }
  },
  created() {
    let now = new Date();
    if (this.$store.getters.getUserToken) {
      if (localStorage.getItem("expiresIn")) {
        if (Number(localStorage.getItem("expiresIn")) > now.getTime()) {
          axios
            .get("/user", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            })
            .then(res => {
              this.$store.dispatch("login", res.data.user);
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          this.$store.dispatch("cleanToken");
        }
      }
    }
  },
  components: {
    appHeader
  }
};
</script>
