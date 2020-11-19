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
          autocomplete="off"
          type="name"
          name="name"
          placeholder="name"
          :class="[
            'form-control',
            { 'border-danger': $v.name.$dirty && $v.name.$error }
          ]"
          v-model="name"
          @blur="$v.name.$touch()"
          @keyup="sendName"
        />
        <small class="text-danger" v-if="$v.name.$dirty && !$v.name.required"
          >name is required
        </small>

        <small class="text-danger" v-if="$v.name.$dirty && !$v.name.unique"
          >name is used choose anther name .
        </small>
      </div>
      <div class="form-group">
        <input
          autocomplete="off"
          type="email"
          name="email"
          placeholder="email"
          :class="[
            'form-control',
            { 'border-danger': $v.email.$dirty && $v.email.$error }
          ]"
          @blur="$v.email.$touch()"
          v-model="email"
          @keyup="sendEmail"
        />
        <small class="text-danger" v-if="$v.email.$dirty && !$v.email.required"
          >email is required
        </small>
        <small class="text-danger" v-if="$v.email.$dirty && !$v.email.unique"
          >email is used choose anther name .
        </small>
        <small class="text-danger" v-if="$v.email.$dirty && !$v.email.email"
          >invalid email
        </small>
      </div>
      <div class="form-group">
        <input
          type="number"
          name="age"
          placeholder="age"
          class="form-control"
          v-model="age"
          @keyup="sendAge"
          :class="[
            'form-control',
            { 'border-danger': $v.age.$dirty && $v.age.$error }
          ]"
          @blur="$v.age.$touch()"
        />
        <small class="text-danger" v-if="$v.age.$dirty && !$v.age.required"
          >age is required
        </small>
        <small class="text-danger" v-else-if="$v.age.$dirty && !$v.age.integer"
          >invalid age
        </small>
        <small class="text-danger" v-else-if="$v.age.$dirty && !$v.age.minVal"
          >age must be more than {{ $v.age.$params.minVal.min }}
        </small>
        <small class="text-danger" v-else-if="$v.age.$dirty && !$v.age.maxVal"
          >age must be less than {{ $v.age.$params.maxVal.max }}
        </small>
      </div>
      <div class="form-group">
        <input
          type="password"
          name="password"
          placeholder="password"
          v-model="password"
          :class="[
            'form-control',
            { 'border-danger': $v.password.$dirty && $v.password.$error }
          ]"
          @input="$v.password.$touch()"
        />
        <small
          class="text-danger"
          v-if="$v.password.$dirty && !$v.password.required"
          >password required .
        </small>
        <small
          class="text-danger"
          v-else-if="$v.password.$dirty && !$v.password.minLen"
          >password must be more than
          {{ $v.password.$params.minLen.min }} digits .
        </small>
        <small
          class="text-danger"
          v-else-if="$v.password.$dirty && !$v.password.containsCaptialLetter"
          >password must contains at least one captial letter .
        </small>
      </div>
      <div class="form-group">
        <input
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          :class="[
            'form-control',
            {
              'border-danger':
                $v.confirmPassword.$dirty && $v.confirmPassword.$error
            }
          ]"
          @input="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        />
        <small
          class="text-danger"
          v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.required"
          >confirm password is required
        </small>
        <small
          class="text-danger"
          v-if="$v.confirmPassword.$dirty && !$v.confirmPassword.sameAs"
          >password does't match .
        </small>
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
import formData from "form-data";
import axios from "axios";
import {
  required,
  email,
  integer,
  minValue,
  minLength,
  sameAs,
  maxValue
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      gender: "0",
      name: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
      names: [],
      emails: []
    };
  },
  created() {
    this.$store.dispatch("load");
    axios
      .post("/getnames")
      .then(res => {
        res.data.forEach(ele => {
          this.names.push(ele.name);
        });
        res.data.forEach(ele => {
          this.emails.push(ele.email);
        });
        this.$store.dispatch("stopLoad");
      })
      .catch(err => {
        console.error(err);
      });
  },
  validations: {
    name: {
      required,
      unique(value, vm) {
        return vm.names.find(ele => ele == value.trim()) ? false : true;
      }
    },
    email: {
      required,
      email,
      unique(value, vm) {
        return vm.emails.find(ele => ele == value.trim()) ? false : true;
      }
    },
    age: {
      required,
      integer,
      minVal: minValue(12),
      maxVal: maxValue(120)
    },
    password: {
      required,
      minLen: minLength(8),
      containsCaptialLetter(value) {
        let con = value.search(/[A-Z]/g);
        if (con == -1) return false;
        return true;
      }
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
  methods: {
    gotoNextStep() {
      this.$store.dispatch("load");
      let form1 = new formData(this.$refs.form1);
      axios
        .post("/register", form1)
        .then(res => {
          this.$store.dispatch("register", res.data);
          this.$store.dispatch("stopLoad");
          this.$emit("gotosecondstep");
        })
        .catch(err => {
          console.error(err);
        });
    },
    sendName() {
      this.$emit("getname", this.name);
    },
    sendGender() {
      this.$emit("getgender", this.gender);
    },
    sendEmail() {
      this.$emit("getemail", this.email);
    },
    sendAge() {
      this.$emit("getage", this.age);
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
