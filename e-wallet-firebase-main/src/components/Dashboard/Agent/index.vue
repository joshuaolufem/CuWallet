<template lang="html">
  <div class="agent container">
    <div class="card p-3 mt-5 py-5">
      <h3 class="text-center mb-5">Wallet Actions</h3>
      <div class="text-center">
        <router-link to="/dashboard/agent/fund-student" class="btn btn-outline-primary mx-1">Fund Student Wallet</router-link>
        <router-link to="/dashboard/agent/fund-agent" class="btn btn-outline-success mx-1">Fund Agent Wallet</router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
