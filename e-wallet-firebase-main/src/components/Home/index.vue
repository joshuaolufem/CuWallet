<template lang="html">
  <div class="Home">
    <Navbar/>
    <Hero/>
    <Benefits/>
    <OneTap/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Hero from './Hero'
import Benefits from './Benefits'
import Footer from './Footer'
import Contact from './Contact'
import OneTap from './OneTap'

export default {
  name: 'Home',
  components: {
    Navbar,
    Hero,
    Benefits,
    OneTap,
    Footer,
    Contact
  }
}
</script>

<style lang="css">
.btn-general {
  width: 125px;
  font-weight: bold;
}

.btn:hover {
  transition-duration: .5s;
}
</style>
