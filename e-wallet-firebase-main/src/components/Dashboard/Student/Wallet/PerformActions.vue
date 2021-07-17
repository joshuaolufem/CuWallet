<template lang="html">
  <div class="perform-actions py-5 justify-content-center">
    <h3 class="text-center mb-3">Wallet Actions</h3>
    <div class="button-group text-center">
      <router-link to="/dashboard/student/wallet/transfer-funds" class="btn btn-outline-success me-3 shadow">Make Transfer</router-link>
      <router-link to="/dashboard/student/wallet/withdraw-funds" class="btn btn-outline-danger btn-general me-3 shadow mxr-0">Withdrawal</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
@media only screen and (max-width: 332px) {
  .mxb-1 {
    margin-bottom: .5rem !important;
  }

  .mxr-0 {
    margin-right: 0 !important;
  }
}
</style>
