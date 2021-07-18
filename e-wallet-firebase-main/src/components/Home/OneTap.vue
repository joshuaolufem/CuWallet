<template lang="html">
  <section class="one-tap py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3 class="mb-4">1-Tap</h3>
          <p class="mb-4">Nowadays, worldwide buyers choose to save time and effort by simply selecting products from any global market at any time of day. The simplicity of completing purchases is frequently the driving force for customers opting for online payment, and as a business owner, you should consider this.</p>
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
