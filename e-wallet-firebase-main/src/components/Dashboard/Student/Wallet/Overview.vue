<template lang="html">
  <div class="overview container-fluid p-0 py-3">
    <div class="row g-3">
      <div class="col-md-6 col-xl-3">
        <div class="card shadow px-3 py-4 border-left-primary max-1">
          <h3>Wallet Balance</h3>
          <h5>Total: ₦10,000</h5>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow px-3 py-4 border-left-warning max-1">
          <h3>All Orders</h3>
          <h5>Total: 15</h5>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow px-3 py-4 border-left-teal max-1">
          <h3>Pending Orders</h3>
          <h5>Total: 5</h5>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow px-3 py-4 border-left-dark max-1">
          <h3>Transactions</h3>
          <h5>Total: 25</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overview'
}
</script>

<style lang="css" scoped>
.border-left-primary {
  border-left: 3px solid #0d6efd;
}

.border-left-warning {
  border-left: 3px solid #ffc107;
}

.border-left-teal {
  border-left: 3px solid #20c997;
}

.border-left-dark {
  border-left: 3px solid #212529;
}

.max-1 {
  max-width: 350px;
  min-height: 150px;
  margin: 0 auto;
}

.font-weight-bold {
  font-weight: bold !important;
}
</style>
