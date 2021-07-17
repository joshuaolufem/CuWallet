<template lang="html">
  <section class="one-tap py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3 class="mb-4">1-Tap</h3>
          <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <router-link to="/auth/register" class="btn btn-outline-dark btn-general">Get Started</router-link>
        </div>
        <div class="col-md-6 overflow-hidden">
          <img src="../../assets/images/wallet.jpeg" alt="" class="text-center">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'OneTap'
}
</script>

<style lang="css" scoped>
img {
  width: 500px;
}
</style>
