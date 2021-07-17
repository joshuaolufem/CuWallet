<template lang="html">
  <div class="container-fluid">
    <div class="pt-5 add-product">
      <router-link to="/dashboard/service-provider/products/" class="btn btn-outline-primary mb-5">
        <i class="bi bi-chevron-double-left"></i>
        Got to Product Listing
      </router-link>
      <div class="card shadow">
        <h3 class="card-header text-dark">Add Product</h3>
        <div class="card-body">
          <form class="user">
            <div class="mb-3 form-group">
              <label>Product image</label>
              <input type="file" class="form-control">
            </div>
            <div class="mb-3 form-group">
              <label>Product name</label>
              <input type="text" placeholder="Product name" class="form-control">
            </div>
            <div class="mb-3 form-group">
              <label>Product price</label>
              <input type="number" placeholder="Product price" class="form-control">
            </div>
            <div class="mb-3 form-group">
              <label>Weight Measurement</label>
              <input type="text" placeholder="e.g KG" class="form-control">
            </div>
            <div class="mb-3 form-group">
              <label>Net weight</label>
              <input type="number" placeholder="e.g KG" class="form-control">
            </div>
            <div class="d-flex justify-content-between">
              <router-link class="btn btn-secondary btn-general-alt shadow-sm mx-1" to="/dashboard/service-provider/products/">Cancel</router-link>
              <button class="btn btn-primary btn-general-alt shadow-sm ml-auto">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct'
}
</script>

<style lang="css" scoped>
.add-product {
  max-width: 600px;
}
</style>
