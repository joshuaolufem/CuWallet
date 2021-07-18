<template lang="html">
  <section class="dashboard">
    <Navbar/>
    <div class="container-fluid p-0 d-flex">
      <Sidebar/>
      <div class="container d-flex justify-content-center">
        <router-view/>
      </div>

    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
  ...mapGetters({ user: 'user' })
}
}
</script>

<style lang="css" scoped>
</style>
