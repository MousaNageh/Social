<template>
  <div>
    <form class="my-2 register-form3" ref="form3">
      <div class="form-group">
        <input
          type="text"
          name="school"
          placeholder="school"
          :class="[
            'form-control',
            {
              'border-danger': $v.school.$dirty && $v.school.$error
            }
          ]"
          v-model="school"
          @blur="$v.school.$touch()"
          @input="sendSchool"
        />
        <small
          class="text-danger"
          v-if="$v.school.$dirty && !$v.school.required"
          >this feild is required
        </small>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="faculty"
          placeholder="faculty"
          :class="[
            'form-control',
            {
              'border-danger': $v.faculty.$dirty && $v.faculty.$error
            }
          ]"
          v-model="faculty"
          @blur="$v.faculty.$touch()"
          @input="sendFaculty"
        />
        <small
          class="text-danger"
          v-if="$v.faculty.$dirty && !$v.faculty.required"
          >this feild is required
        </small>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="job"
          placeholder="job"
          :class="[
            'form-control',
            {
              'border-danger': $v.job.$dirty && $v.job.$error
            }
          ]"
          v-model="job"
          @blur="$v.job.$touch()"
          @input="sendJob"
        />
        <small class="text-danger" v-if="$v.job.$dirty && !$v.job.required"
          >this feild is required
        </small>
      </div>
      <div class="form-group d-flex justify-content-between">
        <button
          class="sign-in"
          :disabled="$v.$invalid"
          @click.prevent="gotoHome"
          :class="['sign-in', { 'envalid-data': $v.$invalid }]"
        >
          save
        </button>
        <button class="sign-in" @click="finishedRegisteration">finish</button>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import formData from "form-data";
export default {
  data() {
    return {
      school: "",
      faculty: "",
      job: ""
    };
  },
  validations: {
    school: {
      required
    },
    faculty: {
      required
    },
    job: {
      required
    }
  },
  methods: {
    gotoHome() {
      this.$store.dispatch("load");
      let form3 = new formData(this.$refs.form3);
      axios
        .post(`register3/${this.$store.getters.getUserSlug}`, form3)
        .then(res => {
          this.$store.dispatch("setUser", res.data.user);
          this.$store.dispatch("stopLoad");
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
        });
    },
    finishedRegisteration() {
      this.$router.push("/");
    },
    sendSchool() {
      this.$emit("getschool", this.school);
    },
    sendFaculty() {
      this.$emit("getfaculty", this.faculty);
    },
    sendJob() {
      this.$emit("getjob", this.job);
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
  color: #000;
}
.envalid-data {
  cursor: not-allowed;
}
</style>
