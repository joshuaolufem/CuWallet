<template lang="html">
  <div class="container py-5">
    <h3 class="text-center mb-3">Student Dashboard</h3>
    <div class="container card min-height-100 shadow">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student'
}
</script>

<style lang="css" scoped>
.min-height-100 {
  min-height: 100px;
}
</style>
