<template lang="html">
  <main class="container-fluid p-0">
    <Navbar/>
    <router-view/>
    <Footer/>
  </main>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'

export default {
  name: 'Shop',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style lang="css" scoped>
</style>
