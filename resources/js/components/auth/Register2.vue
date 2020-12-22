<template>
  <div>
    <form class="my-2 register-form2" ref="form2">
      <div class="form-group upload-img " @click="uploadImg">
        <h5>Upload profile image</h5>
      </div>
      <input
        type="file"
        name="avatar"
        ref="avatar"
        class="d-none"
        @change="updloadUserImage"
        required
        accept="image/*"
      />
      <div class="form-group">
        <textarea
          name="about"
          :class="[
            'form-control',
            {
              'border-danger': $v.about.$dirty && $v.about.$error
            }
          ]"
          placeholder="about"
          v-model="about"
          @blur="$v.about.$touch()"
          maxlength="200"
          @input="sendAbout"
        ></textarea>
        <small class="text-danger" v-if="$v.about.$dirty && !$v.about.required"
          >this feild is required
        </small>
        <small v-else class="text-dark">
          {{ $v.about.$params.maxLen.max }}/{{ about.length }}</small
        >
      </div>
      <div class="form-group">
        <select
          name="country"
          v-model="userCountry"
          @blur="$v.userCountry.$touch()"
          @change="sendCountry"
          class="form-control"
        >
          <option value="" class="text-danger">country: </option>
          <option
            v-for="country in countries"
            :key="country"
            :value="country"
            >{{ country }}</option
          >
        </select>
        <small
          class="text-danger"
          v-if="$v.userCountry.$dirty && !$v.userCountry.required"
          >this feild is required
        </small>
      </div>
      <div class="form-group d-flex justify-content-between">
        <button class="sign-in" @click.prevent="gotoThirdStepFromSkip">
          skip
        </button>
        <button
          class="sign-in"
          :disabled="$v.$invalid || avatar == ''"
          @click.prevent="gotoThirdStep"
          :class="['sign-in', { 'envalid-data': $v.$invalid }]"
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
import { required, maxLength } from "vuelidate/lib/validators";
import GetCounties from "../../requests/Countries";
export default {
  data() {
    return {
      countries: [],
      avatar: "",
      about: "",
      userCountry: ""
    };
  },
  validations: {
    about: {
      required,
      maxLen: maxLength(200)
    },
    userCountry: {
      required
    }
  },
  methods: {
    uploadImg() {
      this.$refs.avatar.click();
    },
    updloadUserImage() {
      let inputImg = this.$refs.avatar;
      let file = inputImg.files;
      if (file && file[0]) {
        this.$emit("changeavatar", file[0]);
      }
    },
    gotoThirdStep() {
      this.$store.dispatch("load");
      let form2 = new formData(this.$refs.form2);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$store.getters.getUserToken}`;
      axios
        .post(`register2/${this.$store.getters.getUserSlug}`, form2)
        .then(res => {
          this.$store.dispatch("setUser", res.data.user);
          this.$store.dispatch("stopLoad");
          this.$emit("gotothirdstep");
        })
        .catch(err => {
          console.error(err);
        });
    },
    sendCountry() {
      this.$emit("getcountry", this.userCountry);
    },
    sendAbout() {
      this.$emit("getabout", this.about);
    },
    gotoThirdStepFromSkip() {
      this.$emit("gotothirdstep");
    }
  },
  created() {
    GetCounties.get().then(resposne => {
      resposne.data.forEach(ele => {
        this.countries.push(ele.name);
      });
    });
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
.upload-img {
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
.upload-img h5 {
  text-align: center;
  line-height: 2;
}
.upload-img:hover {
  background: rgb(80, 80, 230);
}

.form-group select option {
  color: #fff;
  background-color: rgb(39, 40, 44);
}
.envalid-data {
  cursor: not-allowed;
}
</style>
