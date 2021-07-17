<template lang="html">
  <div class="container py-5 register">
    <router-link to="/">
      <i class="bi bi-chevron-left"></i>
      Back to Home
    </router-link>
    <h1 class="text-center mb-3">Register</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style lang="css">
.register form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
