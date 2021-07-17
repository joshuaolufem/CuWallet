<template lang="html">
  <section class="home">
    <section id="hero" class="container-fluid mb-5 shadow pb-5">
      <div class="row pb-5">
        <div class="col-sm-8 pt-3 mx-auto">
          <h1 class="text-center my-5 font-weight-bold">Everything you need, delivered now</h1>
          <h6 class="font-weight-bold mb-3"><i class="fa fa-map-pin map-pin text-info"></i>  Delivering to</h6>
          <input type="text" class="form-control shop-search-input1 box-shadow1 pl-3 ease-in-out shadow" placeholder="Enter your room number">
          <div class="container px-0 py-2 mt-4">
            <h6 class="font-weight-bold mb-3">Choose a service</h6>
            <div class="row">
              <div class="col-md-6 mb-4">
                <router-link to="/shop/store" class="text-dark text-decoration-none box-shadow1">
                  <div class="card p-4 box-shadow1 ease-in-out">
                    <i class="fa fa-store-alt mb-3 hero-icons"></i>
                    <h5>Shopping</h5>
                    <small>Gifts, electronics, airtime & more</small>
                  </div>
                </router-link>
              </div>
              <div class="col-md-6">
                <router-link to="/shop/canteen" class="p-4 text-dark text-decoration-none ease-in-out card box-shadow1">
                  <i class="fa fa-utensils mb-3 hero-icons"></i>
                  <h5>Canteens</h5>
                  <small>Food you love, from Canteens in school</small>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="how-it-works" class="container-fluid pb-5">
      <div class="container pt-5">
        <h1 class="text-center mb-5 font-weight-bold">How it Works</h1>
        <div class="row">
          <div class="col-md-4 text-center mb-4">
            <img src="../../../assets/images/set-location.png" alt="" class="height-12">
            <div class="p-4">
              <h3>Set your convenient delivery location</h3>
              <small>Select the location where you want us to deliver</small>
            </div>
          </div>
          <div class="col-md-4 text-center mb-5">
            <img src="../../../assets/images/chose-product.jpeg" alt="" class="height-12">
            <div class="p-4">
              <h3>Choose the product(s) you want</h3>
              <p>Browse shops that deliver near you</p>
            </div>
          </div>
          <div class="col-md-4 text-center">
            <img src="../../../assets/images/delivery1.jpeg" alt="" class="height-12">
            <div class="p-4">
              <h3>Recieve it at doorstep or go pick it up</h3>
              <p>Your order will be delivered to you in no time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="news-letter" class="container-fluid bg-dark mt-5 shadow">
      <div class="container-small text-white text-center px-5 pt-5 pb-1 mx-auto">
        <h1 class="font-weight-bold">Subscribe to our newsletter today!</h1>
        <p>Don't miss out on our great offers & Recieve deals from all our top vendors via e-mail</p>
        <div class="form-group d-flex mt-4 news-letter" id="sub">
          <input type="email" class="form-control shop-search-input1 pl-3 ease-in-out" placeholder="Enter your e-mail">
          <!-- <input type="email" placeholder="E-mail" class="form-control pl-3"> -->
          <button class="btn btn-outline-light btn-general-alt ease-in-out">SUBSCRIBE</button>
        </div>
        <div class="form-group my-3">
          <input type="checkbox"> I have read and accepted the <a href="#">Terms and conditions</a> and the <a href="#">Privacy policy</a>
        </div>
      </div>
      <div class="d-flex justify-content-between container pb-5 px-5 hide-1023">
        <img src="../../../assets/images/product2.png" alt="" class="mt-2 height-15">
        <img src="../../../assets/images/product3.png" alt="" class="mt-2 height-15">
        <img src="../../../assets/images/product.png" alt="" class="mt-2 height-15">
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="css" scoped>
#news-letter input.form-control {
  /* border-radius: 25px; */
  height: 3.5rem;
  margin-right: .5rem;
  box-shadow: 1px 1px 1px #fff;
}

#news-letter input:focus {
  border-color: #fff !important;
  box-shadow: 1px 1px 10px #fff;
}


#news-letter button {
  height: 3.5rem;
}

#news-letter a {
  color: white;
  text-decoration: underline;
}

.link:hover {
  box-shadow: 2px 2px 20px #333 !important;
}

.height-15 {
  height: 15rem;
}

.height-12 {
  height: 12rem;
}

.shift-right-1 {
  position: relative;
  left: 2rem;
}

.shift-top-1 {
  position: relative;
  bottom: 2rem;
}

.shift-bottom-1 {
  position: relative;
  top: 2rem;
}

.shift-left-1 {
  position: relative;
  right: 2rem;
}

.container-small {
  max-width: 50rem;
}

.hero-icons {
  font-size: 3rem;
}

.box-shadow1:hover {
  border-color: #333;
}

@media only screen and (max-width: 767px) {
  #sub {
    display: block !important;
  }

  #sub input {
    margin-bottom: 1rem;
  }

  #sub button {
    display: block;
    width: 100%;
  }
}

@media only screen and (min-width: 768px) {
  .sidebar-mid-none {
    display: none;
  }
}

@media only screen and (min-width: 480px) {
  .brand-480 {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
  .brand-480 {
    display: block;
  }
}

@media only screen and (min-width: 992px) {
  .hero-header {
    margin-top: 3rem;
  }
}

@media only screen and (max-width: 1023px) {
  .hide-1023 {
    display: none !important;
  }
}

</style>
