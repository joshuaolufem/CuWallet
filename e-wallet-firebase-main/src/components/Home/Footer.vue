<template lang="html">
  <footer>
    <div class="container text-white">
      <div class="row py-5">
        <div class="col-md-3 mb-3 text-center-767">
          <h4>
            <router-link to="/" class="text-decoration-none text-white">E-Wallet</router-link>
          </h4>
        </div>
        <div class="col-md-3 mb-3 text-center-767">
          <h6 class="text-danger">Products</h6>
          <ul class="list-group list-group-flush">
            <li>
              <router-link to="/">Wallet</router-link>
            </li>
            <li>
              <router-link to="/">Canteen</router-link>
            </li>
            <li>
              <router-link to="/">Store</router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-3 mb-3 text-center-767">
          <h6 class="text-danger">Products</h6>
          <ul class="list-group list-group-flush">
            <li>
              <router-link to="/">Wallet</router-link>
            </li>
            <li>
              <router-link to="/">Canteen</router-link>
            </li>
            <li>
              <router-link to="/">Store</router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-3 mb-3 text-center-767">
          <h6 class="text-danger">Products</h6>
          <ul class="list-group list-group-flush">
            <li>
              <router-link to="/">Wallet</router-link>
            </li>
            <li>
              <router-link to="/">Canteen</router-link>
            </li>
            <li>
              <router-link to="/">Store</router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-12 text-center mt-5">
          <p>Copyright &copy; 2021 Joshua Olufemi</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="css" scoped>
footer {
  min-height: 200px;
  background: #161722;
}

ul {
  list-style-type: none;
}

ul li {
  margin: .1rem 0;
}

ul li a {
  text-decoration: none;
  color: #fff;
}

ul li a:hover {
  font-weight: bold;
  text-decoration: underline;
  transition: .5s ease-in-out;
}

@media only screen and (max-width: 767px) {
  .text-center-767 {
    text-align: center;
  }
}
</style>
