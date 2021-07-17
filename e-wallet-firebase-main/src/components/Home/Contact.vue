<template lang="html">
  <div class="container py-5" id="contact">
    <h3>Contact Us</h3>
    <form>
      <div class="mb-3">
        <label for="inputEmail4" class="form-label">Name</label>
        <input type="text" class="form-control" placeholder="Joshua Olufemi" required>
      </div>
      <div class="mb-3">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="joshuaolufemi@email.com" required>
      </div>
      <div class="mb-3">
        <label for="inputEmail4" class="form-label">Message</label>
        <textarea class="form-control" placeholder="Say something..." rows="3" required></textarea>
      </div>
      <div class="mb-3 text-center">
        <button type="submit" class="btn btn-outline-dark mb-3">Send Message</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style lang="css" scoped>
.container {
  max-width: 500px;
}
</style>
