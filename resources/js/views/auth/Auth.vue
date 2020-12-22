<template>
  <div class="main">
    <div :class="['login', { 'login-rgister': !LoginActive }]" ref="login">
      <div class="overlay">
        <div class="container my-5 contain">
          <div class="switching text-center">
            <span
              :class="['mx-1', { active: LoginActive }]"
              @click="gotoLogin"
              v-if="!hiddenLogin"
              >Sign in
            </span>
            <span v-if="!hiddenLogin">|</span>
            <span
              :class="['mx-1', { active: !LoginActive }]"
              @click="gotoRegiseter"
              >Register</span
            >
          </div>
          <transition>
            <login v-if="LoginActive"></login>
            <register v-if="!LoginActive" @hidelogin="hideLogin"></register>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from "./Login.vue";
import register from "./Register.vue";
export default {
  data() {
    return {
      LoginActive: true,
      hiddenLogin: false
    };
  },
  methods: {
    gotoLogin() {
      this.LoginActive = true;
    },
    gotoRegiseter() {
      this.LoginActive = false;
    },
    hideLogin() {
      this.hiddenLogin = true;
    }
  },
  components: { login, register },
  mounted() {
    let timer = setInterval(
      function(img) {
        let x = Math.floor(Math.random() * img.length);
        let login = document.querySelector(".login");
        if (login) login.style.backgroundImage = `url(${img[x]})`;
        else clearInterval(timer);
      },
      3000,
      [
        "/storage/login/1.jpg",
        "/storage/login/2.jpg",
        "/storage/login/3.jpg",
        "/storage/login/4.jpg",
        "/storage/login/5.jpg"
      ]
    );
  }
};
</script>
<style lang="css" scoped>
.switching span {
  cursor: pointer;
  font-size: 30px;
  transition: all 0.4s ease-in-out;
}
.switching span.active {
  color: rgb(80, 80, 230);
}
.login {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: absolute;
  z-index: 1;
  background-image: url("/storage/login/1.jpg");
  transition: all 0.5s linear;
}
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
}
.contain {
  z-index: 3;
  color: #fff;
}
@media (max-width: 767px) {
  .login-rgister {
    height: 200%;
  }
}
</style>
