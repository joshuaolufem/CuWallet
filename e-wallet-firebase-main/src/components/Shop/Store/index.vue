<template lang="html">
    <section id="hero" class="container-fluid p-3">
      <h2 class="text-center mb-3 bg-light">E-Store Section</h2>
      <div class="row g-3">
        <div class="col-md-9 container">
          <div class="row g-3 container">
            <div class="col-md-4 col-lg-3 col-sm-6 col-xsm-6" v-for="item in items" v-bind:key="item.id">
              <div class="card">
                <img :src="item.img" class="card-img-top" :alt="item.description">
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <h5 class="card-title">₦ {{item.price}}</h5>
                  <p class="card-text">{{item.description}}</p>
                  <a href="#" class="btn btn-dark d-block">{{item.btnText}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 px-0 pt-5">
          <div class="row g-3 container shadow bg-white sticky-top">
            <form class="mb-2">
              <div class="mb-3">
                <input type="text" class="form-control">
              </div>
              <button class="btn btn-dark form-control">Search</button>
            </form>
            <ul class="px-0 list-group">
              <h5 class="font-weight-bold">Menu</h5>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
              <a class="list-group-item list-group-item-action" href="#">Dummy</a>
            </ul>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import { storeItems } from './items'

export default {
  name: 'Store',
  data() {
    return {
      items: storeItems
    }
  },
}
</script>

<style lang="css" scoped>

</style>
