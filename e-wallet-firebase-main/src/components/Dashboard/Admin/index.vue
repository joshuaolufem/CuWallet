<template lang="html">
  <div class="admin container">
    <h1 class="text-center mt-5">Admin Section</h1>
    <div class="row g-3 mt-3 justify-content-center">
      <div class="col-md-6 col-xl-3">
        <router-link to="/dashboard/admin/agents" class="card shadow px-3 py-4 border-left-warning max-1 text-decoration-none text-dark">
          <h3>Agents</h3>
          <h5>Total: 20</h5>
          <p>Go to Agent Section</p>
        </router-link>
      </div>
      <div class="col-md-6 col-xl-3">
        <router-link to="/dashboard/admin/service-providers" class="card shadow px-3 py-4 border-left-teal max-1 text-decoration-none text-dark">
          <h3>Providers</h3>
          <h5>Total: 22</h5>
          <p>Go to Providers Section</p>
        </router-link>
      </div>
      <div class="col-md-6 col-xl-3">
        <router-link to="/dashboard/admin/students" class="card shadow px-3 py-4 border-left-dark max-1 text-decoration-none text-dark">
          <h3>Agents</h3>
          <h5>Total: 12000</h5>
          <p>Go to Students Section</p>
        </router-link>
      </div>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Admin'
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
