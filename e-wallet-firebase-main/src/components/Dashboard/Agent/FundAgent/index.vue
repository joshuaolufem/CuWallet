<template lang="html">
  <div class="container">
    <div class="text-center mt-3">
      <router-link to="/dashboard/agent/fund-agent/fund-other-agent" class="btn btn-primary mx-1">Fund Agent</router-link>
      <router-link to="/dashboard/agent/fund-agent/fund-self" class="btn btn-success mx-1">Fund Self</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'FundAgent'
}
</script>

<style lang="css" scoped>
</style>
