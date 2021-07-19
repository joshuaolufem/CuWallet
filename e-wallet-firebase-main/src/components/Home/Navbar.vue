<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
    <div class="container">
      <router-link class="navbar-brand me-5" to="/">CU-Wallet</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Products
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/">Wallet</router-link></li>
              <li><router-link class="dropdown-item" to="/">Restaurant</router-link></li>
              <li><router-link class="dropdown-item" to="/">Shopping Mall</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" to="/">FAQs</router-link></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
        <router-link class="btn btn-outline-dark btn-general" to="/auth">
          Get Started
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="css" scoped>
@media only screen and (min-width: 1024px) {
  .nav-link {
    padding: 0 1.5rem !important;
  }

  .nav-link:hover {
    border-bottom: 1px solid #333;
    transition: .5s ease-in-out;
  }
}
</style>
