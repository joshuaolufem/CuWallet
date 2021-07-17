<template lang="html">
  <div class="login py-5">
    <router-link to="/">
      <i class="bi bi-chevron-left"></i>
      Back to Home
    </router-link>
    <h1 class="text-center mb-4">Login</h1>
    <form class="mx-auto">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="Email">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" placeholder="Password">
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-dark btn-general mt-2 mb-3" @click="loginStudent">Login</button>
        <p>Don't have an account? <router-link to="/auth/register">Register</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Login', 
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async loginStudent () {
      try{
        const data = {
          email: this.email,
          password: this.password
        }
        let result = await axios.post("http://localhost:3000/student/auth/login", data);

        console.log(result)
      }
      catch(e){
        console.log(e);
      }
    }
  }
}
</script>

<style lang="css" scoped>
form {
  max-width: 500px;
}
</style>
