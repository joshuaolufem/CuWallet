<template lang="html">
  <div class="fund-wallet mx-auto card p-3 mb-3 shadow">
    <h5 class="text-center mb-3">Make a Transfer</h5>
    <form>
      <div class="mb-3">
        <label class="form-label">Reciepient's Wallet ID</label>
        <input type="text" placeholder="Matric Number of Reciepient" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Amount</label>
        <input type="number" placeholder="Amount in Naira" class="form-control">
      </div>
      <div class="text-center">
        <router-link to="/dashboard/student/wallet" class="btn btn-outline-dark btn-general mt-2 mb-3 me-3 mxb-1 mxr-0">
          Cancel
        </router-link>
        <button type="submit" class="btn btn-outline-primary btn-general mt-2 mb-3 mxr-0">
          Proceed
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FundWallet'
}
</script>

<style lang="css" scoped>
.fund-wallet {
  max-width: 500px;
}
</style>
