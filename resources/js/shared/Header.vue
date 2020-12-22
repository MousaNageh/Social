<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container">
        <router-link tag="a" class="navbar-brand" to="/"> Social</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <router-link
              tag="li"
              class="nav-item mx-2"
              active-class="active"
              to="/"
              exact
            >
              <a class="nav-link" title="posts">
                <i class="fa fa-newspaper-o fa-1x" aria-hidden="true"></i>
                <span class="d-inline d-sm-none m-1">Posts</span>
              </a>
            </router-link>
            <router-link
              tag="li"
              class="nav-item mx-2"
              to="/relations"
              active-class="active"
            >
              <a class="nav-link" title="relations">
                <i class="fa fa-users" aria-hidden="true"></i>
                <span class="d-inline d-sm-none m-1">relations</span>
              </a>
            </router-link>
            <router-link
              tag="li"
              class="nav-item mx-2"
              to="/profile"
              active-class="active"
            >
              <a class="nav-link" title="profile">
                <i class="fa fa-user" aria-hidden="true"></i>
                <span class="d-inline d-sm-none m-1">profile</span>
              </a>
            </router-link>
            <router-link
              tag="li"
              class="nav-item mx-2"
              to="/create-post"
              active-class="active"
            >
              <a class="nav-link" title="make post">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <span class="d-inline d-sm-none m-1">Make post</span>
              </a>
            </router-link>
            <router-link
              tag="li"
              class="nav-item mx-2"
              to="/"
              active-class="active"
            >
              <a
                class="nav-link"
                title="log/sign in"
                active-class="active"
                to="/"
              >
                <i class="fa fa-bell-o" aria-hidden="true"></i>
              </a>
            </router-link>
            <router-link tag="li" class="nav-item mx-2" to="/">
              <a class="nav-link" title="logout">
                <i class="fa fa-power-off" aria-hidden="true"></i>
                <span class="d-inline d-sm-none m-1">logout</span>
              </a>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
.fa,
span {
  font-size: 20px;
}
li.active .fa,
li.active span {
  color: #2ecc71;
}
</style>
