<template>
  <div>
    <form class="text-center" ref="loginForm">
      <div class="form-group">
        <input
          type="email"
          name="email"
          placeholder="email"
          :class="[
            'form-control',
            {
              'border-danger': $v.email.$dirty && $v.email.$error
            }
          ]"
          v-model="email"
          @blur="$v.email.$touch()"
        />
        <small class="text-danger" v-if="$v.email.$dirty && !$v.email.required"
          >email is required
        </small>
        <small
          class="text-danger"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >email is not valid
        </small>
        <small
          class="text-danger"
          v-else-if="$v.email.$dirty && !$v.email.exists"
          >email is not exist
        </small>
      </div>
      <div class="form-group">
        <input
          type="password"
          name="password"
          placeholder="password"
          :class="[
            'form-control',
            {
              'border-danger': $v.password.$dirty && $v.password.$error
            }
          ]"
          v-model="password"
          @blur="$v.password.$touch()"
        />
        <small
          class="text-danger"
          v-if="$v.password.$dirty && !$v.password.required"
          >password is required
        </small>
        <small class="text-danger" v-if="wrongPassowrod">wrong password </small>
      </div>
      <button
        :class="['sign-in', { 'envalid-data': $v.$invalid }]"
        :disabled="$v.$invalid"
        @click.prevent="login"
      >
        sign in
      </button>
      <div class="loading-login p-2" v-if="loading">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import formData from "form-data";
export default {
  created() {
    axios
      .post("/getemails")
      .then(res => {
        this.emails = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  data() {
    return {
      emails: [],
      email: "",
      password: "",
      loading: false,
      wrongPassowrod: false
    };
  },
  validations: {
    email: {
      required,
      email,
      exists(value, vm) {
        return vm.emails.indexOf(value) == -1 ? false : true;
      }
    },
    password: {
      required
    }
  },
  methods: {
    login() {
      this.loading = true;
      let form = new formData(this.$refs.loginForm);
      axios
        .post("/login", form)
        .then(res => {
          this.wrongPassowrod = false;
          this.$store.dispatch("register", res.data);
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.wrongPassowrod = true;
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="css" scoped>
.form-control {
  background-color: inherit;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  border: 1px solid rgb(80, 80, 230);
}
input::placeholder {
  color: #fff;
  transition: all 0.4s ease-in-out;
  opacity: 0.6;
}
input:focus::placeholder {
  opacity: 0;
}
form {
  position: absolute;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (max-width: 567px) {
  form {
    width: 90%;
  }
}
@media (min-width: 568px) and (max-width: 767px) {
  form {
    width: 80%;
  }
}
.sign-in {
  width: 100px;
  height: 40px;
  background: inherit;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  outline: none;
  transition: all 0.4s ease-in-out;
}
.sign-in:hover {
  background: rgb(80, 80, 230);
  border: none;
}
.envalid-data {
  cursor: not-allowed;
}
</style>
