<template lang="html">
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 py-5 text-white">
          <h3 class="my-3">CASHLESS MADE EFFORTLESS</h3>
          <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <router-link to="/auth" class="btn btn-outline-light btn-general">Get Started</router-link>
        </div>
        <div class="col-md-6 text-center d-none-767">
          <img src="../../assets/images/hero-img2.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style lang="css" scoped>
.hero {
  min-height: 500px;
  background-image: url("../../assets/images/hero-bg.gif");
  background-size: cover;
  background-repeat: no-repeat;
}

@media only screen and (max-width: 767px) {
  .d-none-767 {
    display: none;
  }
}
</style>
