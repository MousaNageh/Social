<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <transition name="goto" mode="out-in">
          <register1
            v-if="steps.register1"
            @gotosecondstep="gotoSecondStep"
            @getname="getName"
            @getgender="getGender"
          ></register1>
          <register2
            v-if="steps.register2"
            @gotothirdstep="gotoThridStep"
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
        gender: "0"
      }
    };
  },
  computed: {
    userData() {
      return this.user;
    }
  },
  methods: {
    gotoSecondStep() {
      this.steps.register1 = this.steps.register3 = false;
      this.steps.register2 = true;
    },
    gotoThridStep() {
      this.steps.register1 = this.steps.register2 = false;
      this.steps.register3 = true;
    },
    getName(e) {
      this.user.name = e;
    },
    getGender(e) {
      console.log(e);
      this.user.gender = e;
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
</style>
