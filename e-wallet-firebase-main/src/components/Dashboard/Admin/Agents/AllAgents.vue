<template lang="html">
  <div class="all-agents">
    <div class="text-center">
      <router-link to="/dashboard/admin/agents/create-agent-account" class="btn btn-outline-dark mt-5">
        Create Agent
        <i class="bi-chevron-double-right"></i>
      </router-link>
    </div>
    <h3 class="text-center my-3">All Agents</h3>
    <div class="container">
      <div class="card mx-auto mb-3">
        <div class="card-body text-center">
          <h4>Agent 1</h4>
          <h6>agent1@email.com</h6>
          <button class="btn btn-outline-danger">Delete user</button>
        </div>
      </div>
      <div class="card mx-auto mb-3">
        <div class="card-body text-center">
          <h4>Agent 2</h4>
          <h6>agent2@email.com</h6>
          <button class="btn btn-outline-danger">Delete user</button>
        </div>
      </div>
      <div class="card mx-auto mb-3">
        <div class="card-body text-center">
          <h4>Agent 3</h4>
          <h6>agent3@email.com</h6>
          <button class="btn btn-outline-danger">Delete user</button>
        </div>
      </div>
      <div class="card mx-auto mb-3">
        <div class="card-body text-center">
          <h4>Agent 4</h4>
          <h6>agent4@email.com</h6>
          <button class="btn btn-outline-danger">Delete user</button>
        </div>
      </div>
      <div class="card mx-auto mb-3">
        <div class="card-body text-center">
          <h4>Agent 5</h4>
          <h6>agent5@email.com</h6>
          <button class="btn btn-outline-danger">Delete user</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllAgents'
}
</script>

<style lang="css" scoped>
.card {
  max-width: 400px;
}
</style>
