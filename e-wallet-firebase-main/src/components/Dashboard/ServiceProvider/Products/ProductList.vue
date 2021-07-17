<template lang="html">
  <div class="table-responsive ms-5 mt-5">
    <router-link to="/dashboard/service-provider/products/add-product" class="btn btn-primary mb-5">
      Add Product
      <i class="bi bi-chevron-double-right"></i>
    </router-link>
    <table class="table align-middle table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>Gas cooker</td>
          <td>$400</td>
          <td>
            <a class="btn btn-outline-success mx-1">Edit</a>
            <a class="btn btn-outline-danger mx-1">Delete</a>
          </td>
        </tr>
        <tr>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProductList'
}
</script>

<style lang="css" scoped>
</style>
