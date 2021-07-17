<template lang="html">
  <div class="orders">
    <OrderTable/>
  </div>
</template>

<script>
import OrderTable from './OrderTable'

export default {
  name: 'Orders',
  components: {
    OrderTable
  }
}
</script>

<style lang="css" scoped>
</style>
