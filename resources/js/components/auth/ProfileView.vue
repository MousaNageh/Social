<template>
  <div>
    <div class="profile my-2">
      <div class="card w-100" style="width: 18rem;">
        <div class="text-center pt-4">
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
        <p class="text-center mt-2">
          about you
        </p>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item">
              <h5>
                <i
                  class="fa fa-male"
                  aria-hidden="true"
                  v-if="user.gender == 0"
                ></i>
                <i class="fa fa-female" aria-hidden="true" v-else></i>
                gender : {{ user.gender == 0 ? "male" : "female" }}
              </h5>
            </li>
            <li class="list-group-item ">
              <h5>
                <i class="fa fa-user" aria-hidden="true"></i> name :
                {{ user.name }}
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                <i class="fa fa-envelope-o" aria-hidden="true"></i> email :
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                <i class="fa fa-location-arrow" aria-hidden="true"></i>
                location :
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                <i class="fa fa-home" aria-hidden="true"></i>
                school :
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                university :
              </h5>
            </li>
            <li class="list-group-item">
              <h5>
                <i class="fa fa-briefcase" aria-hidden="true"></i>
                job :
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["user"]
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
