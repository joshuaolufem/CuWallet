<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
    <div class="container-fluid">
      <button class="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand me-auto" to="/">E-Wallet</router-link>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0 d-flex">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-fill"></i> Joshua
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" to="/">Delete Account</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/">Log out</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="css" scoped>
nav * {
  font-weight: bold;
}
</style>
