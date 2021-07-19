<template lang="html">
  <div class="login py-5">
    <router-link to="/">
      <i class="bi bi-chevron-left"></i>
      Back to Home
    </router-link>
    <h1 class="text-center mb-4">Login</h1>
    <form class="mx-auto" @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" placeholder="Email" v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-outline-dark btn-general mt-2 mb-3" :disabled="disabled">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
          <span v-else>Login</span>
        </button>
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
    loading: false,
    disabled: false
  }),
  methods: {
    async login () {
      try{
        this.loading = true
        this.disabled = true
        const data = {
          email: this.email,
          password: this.password
        }
        let result = await axios.post("http://localhost:3000/user/auth/login", data)

        var user
        var token

        await console.log(result.data.user)
        if (result.data.student !== undefined) {
          user = result.data.student
          token = user.token
          localStorage.setItem('token', token)
          this.$store.dispatch('setUser', user)
          this.$router.push('/dashboard/student')
        }
        else if (result.data.provider !== undefined) {
          user = result.data.provider
          token = user.user.token
          localStorage.setItem('token', token)
          this.$store.dispatch('setUser', user)
          this.$router.push('/dashboard/serviceprovider')
        }
        else if (result.data.user !== undefined) {
          user = result.data.user
          token = user.token
          localStorage.setItem('token', token)
          this.$store.dispatch('setUser', user)
          this.$router.push('/dashboard/' + user.role)
        }


        this.loading = false
        this.disabled = false

      }
      catch(e){
        console.log(e)
        localStorage.removeItem('token')
        this.loading = false
        this.disabled = false
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
