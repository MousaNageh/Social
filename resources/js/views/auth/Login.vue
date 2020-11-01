<template>
  <div>
    <form class="text-center">
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
      <button class="sign-in">sign in</button>
    </form>
  </div>
</template>
<script></script>
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
</style>
