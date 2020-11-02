<template>
  <div>
    <form class="my-2 register-form2">
      <div class="form-group upload-img " @click="uploadImg">
        <h5>Upload profile image</h5>
      </div>
      <input type="file" name="avatar" ref="avatar" class="d-none" />
      <div class="form-group">
        <textarea
          name="about"
          class="form-control"
          placeholder="about"
        ></textarea>
      </div>
      <div class="form-group">
        <select name="country" class="form-control">
          <option
            v-for="country in countries"
            :key="country"
            :value="country"
            >{{ country }}</option
          >
        </select>
      </div>
      <div class="form-group d-flex justify-content-between">
        <button class="sign-in">skip</button>
        <button class="sign-in" @click.prevent="gotoThirdStep">next</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      countries: []
    };
  },
  methods: {
    uploadImg() {
      this.$refs.avatar.click();
    },
    gotoThirdStep() {
      this.$emit("gotothirdstep");
    }
  },
  created() {
    axios.get("https://restcountries.eu/rest/v2/all").then(resposne => {
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
</style>
