<template lang="html">
  <div class="cart">
    <h2>Cart Page</h2>
    <ul v-for="item in inCart" :key="item.id">
      <li> {{ item.title }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    inCart () {
      return this.$store.getters.inCart
    }
  }
}
</script>

<style lang="css" scoped>
</style>
