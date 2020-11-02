<template>
  <div>
    <form class=" mt-2 register" ref="form1">
      <div class="form-group">
        <select
          name="gender"
          class="form-control"
          v-model="gender"
          @change="sendGender"
        >
          <option value="0">male</option>
          <option value="1">female</option>
        </select>
      </div>
      <div class="form-group ">
        <input
          type="name"
          name="name"
          placeholder="name"
          :class="[
            'form-control',
            { 'border-danger': $v.name.$dirty && $v.name.$error }
          ]"
          v-model="name"
          @blur="$v.$touch()"
          @keyup="sendName"
        />
        <small class="text-danger" v-if="$v.name.$dirty && !$v.name.required"
          >name is required
        </small>
      </div>
      <div class="form-group">
        <input
          type="email"
          name="email"
          placeholder="email"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          name="age"
          placeholder="age"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          name="password"
          placeholder="password"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          class="form-control"
        />
      </div>
      <div class="form-group text-center">
        <button
          :class="['sign-in', { 'envalid-data': $v.$invalid }]"
          @click.prevent="gotoNextStep"
          :disabled="$v.$invalid"
        >
          next
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      gender: "0",
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
    gotoNextStep() {
      this.$emit("gotosecondstep");
    },
    sendName() {
      this.$emit("getname", this.name);
    },
    sendGender() {
      this.$emit("getgender", this.gender);
    }
  }
};
</script>
<style lang="css" scoped>
.form-control,
.upload-img {
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
  width: 100%;
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
.form-group select option {
  color: #fff;
  background-color: rgb(39, 40, 44);
}
.envalid-data {
  cursor: not-allowed;
}
</style>
