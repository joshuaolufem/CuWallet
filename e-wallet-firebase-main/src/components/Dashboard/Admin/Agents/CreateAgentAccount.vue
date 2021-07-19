<template lang="html">
  <div class="create-agent">
    <div class="text-center">
      <router-link to="/dashboard/admin/agents/" class="btn btn-outline-dark mt-5 mb-3">
        <i class="bi-chevron-double-left"></i>
        Back to Agents
      </router-link>
    </div>
    <form class="card mx-auto p-3">
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control">
      </div>
      <div class="mb-3 text-center">
        <button class="btn btn-outline-dark btn-general">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
form {
  max-width: 400px;
}
</style>
