<template>
  <div>
    <form class="my-2 register-form3">
      <div class="form-group">
        <input
          type="text"
          name="school"
          placeholder="school"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          name="faculty"
          placeholder="faculty"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <input type="text" name="job" placeholder="job" class="form-control" />
      </div>
      <div class="form-group d-flex justify-content-between">
        <button class="sign-in">save</button>
        <button class="sign-in">skip</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
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
</style>
