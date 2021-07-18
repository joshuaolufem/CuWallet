<template lang="html">
  <section class="hero">
    <div class="container">
      <div class="row">
        <div class="col-md-6 py-5 text-white">
          <h3 class="my-3">CASHLESS MADE EFFORTLESS</h3>
          <p class="mb-4">Online payment is rapidly displacing traditional payment methods, such as human contact between business owners and customers. Regardless of their size, most businesses prefer to use electronic payment systems.</p>
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
