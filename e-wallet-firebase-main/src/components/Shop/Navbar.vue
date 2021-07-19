<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white shadow">
    <div class="container-fluid">
      <router-link class="navbar-brand me-auto" to="/">E-Wallet</router-link>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-fill"></i> Joshua
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" to="/">Delete Account</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/">Log out</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="bi bi-cart-fill"></i>
            Cart
          </router-link>
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
