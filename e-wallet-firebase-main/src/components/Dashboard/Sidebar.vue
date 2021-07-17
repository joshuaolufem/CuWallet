<template lang="html">
  <div class="sidebar-container">
    <div class="sidebar">
      <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
          <h3 class="offcanvas-title" id="offcanvasScrollingLabel">E-Wallet</h3>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
      </div>
    </div>
    <div class="sidebar1 pt-5 sticky-top container">
      <div class="list-group mt-5 shadow" id="list-tab">
        <router-link class="list-group-item list-group-item-action" id="list-home-list" to="/dashboard/student/wallet" role="" aria-controls="list-home">Wallet</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-profile-list" to="/dashboard/student/orders" role="" aria-controls="list-profile">Orders</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-profile-list" to="/shop" role="tab" aria-controls="list-profile">Shop</router-link>
      </div>

      <div class="list-group mt-5 shadow" id="list-tab">
        <router-link class="list-group-item list-group-item-action" id="list-home-list" to="/dashboard/service-provider/wallet" role="" aria-controls="list-home">Wallet</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-profile-list" to="/dashboard/service-provider/products" aria-controls="list-profile">Products</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-messages-list" to="/settings" role="" aria-controls="list-messages">Orders</router-link>
      </div>

      <div class="list-group mt-5 shadow" id="list-tab">
        <router-link class="list-group-item list-group-item-action" id="list-home-list" to="/dashboard/agent/wallet" role="" aria-controls="list-home">Wallet</router-link>
      </div>

      <div class="list-group mt-5 shadow" id="list-tab">
        <router-link class="list-group-item list-group-item-action" id="list-home-list" to="/dashboard/admin/wallet" role="" aria-controls="list-home">Agents</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-profile-list" to="/dashboard/admin/Products" role="" aria-controls="list-profile">Students</router-link>
        <router-link class="list-group-item list-group-item-action" id="list-messages-list" to="/settings" role="tab" aria-controls="list-messages">Service Providers</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style lang="css" scoped>
.bg-dark-custom {
  background: #161722;
}

a.router-link-exact-active {
  background: #0d6efd;
}

.sidebar {
  display: block;
}

.sidebar1 {
  min-width: 300px;
}

@media only screen and (max-width: 991px) {
  .sidebar1 {
    display: none;
  }
}

@media only screen and (min-width: 992px) {
  .sidebar {
    display: none;
  }
}
</style>
