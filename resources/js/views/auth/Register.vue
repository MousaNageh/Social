<template>
  <div>
    <div class="loading-data" v-if="loading">
      <div class="spinner-border"></div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <transition name="goto" mode="out-in">
          <register1
            v-if="steps.register1"
            @gotosecondstep="gotoSecondStep"
            @getname="getName"
            @getgender="getGender"
            @getemail="getEmail"
            @getage="getAge"
          ></register1>
          <register2
            v-if="steps.register2"
            @gotothirdstep="gotoThridStep"
            @changeavatar="changeAvatar"
            @getcountry="getCountry"
            @getabout="getAbout"
          ></register2>
          <register3 v-if="steps.register3"></register3>
        </transition>
      </div>
      <div class="col-md-6 ">
        <profile-view :user="userData"></profile-view>
      </div>
    </div>
  </div>
</template>
<script>
import register1 from "../../components/auth/Register1.vue";
import register2 from "../../components/auth/Register2.vue";
import register3 from "../../components/auth/Register3.vue";
import profileView from "../../components/auth/ProfileView.vue";
export default {
  data() {
    return {
      countries: [],
      steps: {
        register1: true,
        register2: false,
        register3: false
      },
      user: {
        name,
        gender: "0",
        email: "",
        age: "",
        avatar: "",
        country: "",
        about: ""
      }
    };
  },
  computed: {
    userData() {
      return this.user;
    },
    loading() {
      return this.$store.getters.getLoad;
    }
  },
  methods: {
    gotoSecondStep() {
      this.steps.register1 = this.steps.register3 = false;
      this.steps.register2 = true;
      this.$emit("hidelogin");
    },
    gotoThridStep() {
      this.steps.register1 = this.steps.register2 = false;
      this.steps.register3 = true;
    },
    getName(e) {
      this.user.name = e;
    },
    getGender(e) {
      this.user.gender = e;
    },
    getEmail(e) {
      this.user.email = e;
    },
    getAge(e) {
      this.user.age = e;
    },
    changeAvatar(e) {
      this.user.avatar = e;
    },
    getCountry(e) {
      this.user.country = e;
    },
    getAbout(e) {
      this.user.about = e;
    }
  },
  components: {
    register1,
    register2,
    register3,
    profileView
  }
};
</script>
<style lang="css" scoped>
.goto-enter-active {
  animation: go-out 0.5s ease-in-out forwards;
  transition: all 0.5s ease-in-out;
}
.goto-leave-active {
  animation: go-in 0.5s ease-in-out forwards;
  transition: all 0.5s ease-in-out;
}
@keyframes go-in {
  from {
    transform: translateX(0px);
    opacity: 1;
  }
  to {
    transform: translateX(-15px);
    opacity: 0;
  }
}
@keyframes go-out {
  from {
    transform: translateX(-15px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
.loading-data {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
}
.spinner-border {
  margin-top: 25%;
}
</style>
