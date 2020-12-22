<template>
  <div>
    <div class="profile my-2">
      <div class="card w-100" style="width: 18rem;">
        <div class="text-center pt-4" v-if="!user.avatar">
          <div v-if="!realImage">
            <img
              class="card-img-top user-img"
              src="/storage/default/male.jpg"
              v-if="user.gender == 0"
            />
            <img
              class="card-img-top user-img"
              src="/storage/default/female.jpg"
              v-else
            />
          </div>
          <img class="card-img-top user-img" :src="realImage" v-else />
        </div>
        <div class="text-center pt-4" v-else>
          <img class="card-img-top user-img" :src="userImage" />
        </div>

        <p class="text-center mt-2" v-if="!user.about">
          about you
        </p>
        <p class="text-center mt-2">
          {{ user.about }}
        </p>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">
              <h6>
                <i
                  class="fa fa-male"
                  aria-hidden="true"
                  v-if="user.gender == 0"
                ></i>
                <i class="fa fa-female" aria-hidden="true" v-else></i>
                gender : {{ user.gender == 0 ? "male" : "female" }}
              </h6>
            </li>
            <li class="list-group-item ">
              <h6>
                <i class="fa fa-user" aria-hidden="true"></i> name :
                {{ user.name }}
              </h6>
            </li>
            <li class="list-group-item">
              <h6>
                <i class="fa fa-envelope-o" aria-hidden="true"></i> email :{{
                  user.email
                }}
              </h6>
            </li>
            <li class="list-group-item">
              <h6>
                <i class="fa fa-birthday-cake" aria-hidden="true"></i> age :{{
                  user.age
                }}
              </h6>
            </li>

            <li class="list-group-item">
              <h6>
                <i class="fa fa-location-arrow" aria-hidden="true"></i>
                location : {{ user.country }}
              </h6>
            </li>
            <li class="list-group-item">
              <h6>
                <i class="fa fa-home" aria-hidden="true"></i>
                school : {{ user.school }}
              </h6>
            </li>
            <li class="list-group-item">
              <h6>
                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                university : {{ user.faculty }}
              </h6>
            </li>
            <li class="list-group-item">
              <h6>
                <i class="fa fa-briefcase" aria-hidden="true"></i>
                job : {{ user.job }}
              </h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      userAvatar: null
    };
  },
  computed: {
    userImage() {
      if (this.user.avatar) {
        let reader = new FileReader();
        reader.onload = e => {
          this.userAvatar = e.target.result;
        };
        reader.readAsDataURL(this.user.avatar);
        return this.userAvatar;
      }
    },
    realImage() {
      if (this.$store.getters.getUser.profile) {
        return this.$store.getters.getUser.profile.avatar;
      } else return "";
    }
  }
};
</script>
<style lang="css">
.profile .card,
.profile .list-group .list-group-item {
  background: inherit;
  border: 1px solid rgb(80, 80, 230);
}
.user-img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
</style>
