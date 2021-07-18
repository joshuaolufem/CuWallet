<template lang="html">
  <div class="container">
    <div class="card shadow fund-student p-3 mx-auto mt-5">
      <h3 class="text-dark">Fund Student</h3>
      <form class="user">
        <div class="mb-3 form-group">
          <label>Student E-mail</label>
          <input type="email" class="form-control" placeholder="joshuaolufemi@email.com" required v-model="email">
        </div>
        <div class="mb-3 form-group">
          <label>Amount</label>
          <input type="number" placeholder="Amount" class="form-control">
        </div>
        <div class="mb-3 form-group">
          <label>Secret Pin</label>
          <input type="password" placeholder="Your secret 6 digit pin" class="form-control">
        </div>
        <div class="d-flex justify-content-between">
          <router-link class="btn btn-secondary btn-general-alt shadow-sm mx-1" to="/dashboard/agent/fund-wallet">Cancel</router-link>
          <button class="btn btn-primary btn-general-alt shadow-sm ml-auto">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Fund Student',
  data: () => ({
    email: '',
    amount: ''

  }),

  methods: {
    async fundStudent (){
      try {
        const data = {
          email: this.email,
          amount: this.amount,
        }
        let result = await axios.post("http:localhost:3000/user/agent/60e38b887d54bb3e74673478/fundstudentwallet", data);
        console.log(result)
      }catch(e){
        console.log(e);
      }
    }
  }

}
</script>

<style lang="css" scoped>
.fund-student {
  max-width: 500px;
}
</style>
