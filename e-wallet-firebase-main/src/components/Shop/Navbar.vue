<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light sticky-top bg-white shadow">
    <div class="container">
      <router-link class="navbar-brand me-auto" to="/">E-Wallet</router-link>
      <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-fill"></i> Joshua
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><router-link class="dropdown-item" to="/">Log out</router-link></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/shop/cart" class="nav-link position-relative" v-if="inCart.length > 0">
            <i class="bi bi-cart-fill"></i>
            <span class="position-absolute top-3 start-1 translate-middle badge rounded-pill bg-danger">
              <small>{{ inCart.length }}</small>
            </span>
            Cart
          </router-link>
          <router-link to="/shop/cart" class="nav-link" v-else>
            <i class="bi bi-cart-fill"></i>
            Cart
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({ inCart: 'inCart' })
  }
}
</script>

<style lang="css" scoped>
nav * {
  font-weight: bold;
}
</style>
