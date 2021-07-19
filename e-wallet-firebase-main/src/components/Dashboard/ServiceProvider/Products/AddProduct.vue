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
              <input type="file" class="form-control" @change="addImage($event)">
            </div>
            <div class="mb-3 form-group">
              <label>Product name</label>
              <input type="text" placeholder="Product name" class="form-control" v-model="name">
            </div>
            <div class="mb-3 form-group">
              <label class="form-label">Category</label>
              <select class="form-select" aria-label="Default select example" @change="selectCategory($event)">
                <option selected disabled>Choose Category</option>
                <option v-for="category in categories" :key="category.index" :value="categoy">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="mb-3 form-group">
              <label>Product price</label>
              <input type="number" placeholder="Product price" class="form-control" v-model="price">
            </div>
            <div class="mb-3 form-group">
              <label>Quantity</label>
              <input type="number" placeholder="Product Quantity" class="form-control" v-model="quantity">
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
  name: 'AddProduct',
  data: () => ({
    name: '',
    price: '',
    categories: [
      'Fashion',
      'Sports',
      'Electronics',
      'Drinks'
    ]
  })
}
</script>

<style lang="css" scoped>
.add-product {
  max-width: 600px;
}
</style>
