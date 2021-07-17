<template lang="html">
  <div class="container">
    <div class="card shadow fund-student p-3 mx-auto mt-5">
      <h3 class="text-dark">Fund Self</h3>
      <form class="user">
        <div class="mb-3 form-group">
          <label>Amount</label>
          <input type="number" placeholder="Amount" class="form-control">
        </div>
        <div class="mb-3 form-group">
          <label>Secret Pin</label>
          <input type="password" placeholder="Your secret 6 digit pin" class="form-control">
        </div>
        <div class="d-flex justify-content-between">
          <router-link class="btn btn-secondary btn-general-alt shadow-sm mx-1" to="/dashboard/agent/fund-wallet">Cancel</router-link>
          <button class="btn btn-primary btn-general-alt shadow-sm ml-auto">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Self'
}
</script>

<style lang="css" scoped>
.fund-student {
  max-width: 500px;
}
</style>
