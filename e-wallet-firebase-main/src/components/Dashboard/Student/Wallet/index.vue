<template lang="html">
  <section class="wallet">
    <!-- <div class="text-center">
      <div class="spinner-border m-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div> -->
    <Overview/>
    <PerformActions/>
    <router-view/>
  </section>
</template>

<script>
import Overview from './Overview'
import PerformActions from './PerformActions'

export default {
  name: 'Wallet',
  components: {
    Overview,
    PerformActions
  }
}
</script>

<style lang="css" scoped>
</style>
