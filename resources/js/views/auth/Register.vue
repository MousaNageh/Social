<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <form class="text-center mt-5">
          <div class="form-group">
            <input
              type="name"
              name="name"
              placeholder="name"
              class="form-control"
            />
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
          <div class="form-group">
            <select name="gender" class="form-control">
              <option value="0">male</option>
              <option value="1">female</option>
            </select>
          </div>
          <div class="form-group uplpad-img" @click="uploadImg">
            <h5>Upload profile image</h5>
          </div>
          <input type="file" name="avatar" ref="avatar" class="d-none" />
          <button class="sign-in">sign in</button>
        </form>
      </div>
      <div class="col-md-6 ">
        <div class="profile my-5">
          <div class="card w-100" style="width: 18rem;">
            <img
              class="card-img-top"
              src="/storage/default/male.jpg"
              style="height: 200px;"
            />
            <div class="card-body">
              <h5 class="card-title">profile</h5>
              <ul class="list-group">
                <li class="list-group-item">
                  <h4>name :</h4>
                </li>
                <li class="list-group-item">
                  <h4>email :</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    uploadImg() {
      this.$refs.avatar.click();
    }
  }
};
</script>
<style lang="css" scoped>
.form-group,
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
.uplpad-img {
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
.uplpad-img h5 {
  text-align: center;
  line-height: 2;
}
.uplpad-img:hover {
  background: rgb(80, 80, 230);
}
.profile .card {
  background: inherit;
  border: 1px solid rgb(80, 80, 230);
}
.form-group select option {
  color: #000;
}
</style>
