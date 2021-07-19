<template lang="html">
  <form class="row g-3" @submit.prevent="registerStudent">
    <div class="text-center">
      <h3>Student Sign-up</h3>
      <p>Are you are Service Provider? <router-link to="/auth/register/service-provider">Register here</router-link></p>
    </div>
    <div class="col-md-6">
      <label class="form-label">First Name</label>
      <input type="text" class="form-control" placeholder="Joshua" required v-model="firstName">
    </div>
    <div class="col-md-6">
      <label class="form-label">Last Name</label>
      <input type="text" class="form-control" placeholder="Olufemi" required v-model="lastName">
    </div>
    <div class="col-md-6">
      <label class="form-label">Matric Number</label>
      <input type="text" class="form-control" placeholder="Matric No." required v-model="matricNo">
    </div>
    <div class="col-md-6">
      <label class="form-label">Level</label>
      <select class="form-select" aria-label="Default select example" @change="selectLevel($event)">
        <option selected disabled>Choose Level</option>
        <option v-for="level in levels" :key="level.index" :value="level">
          {{ level + ' Level'}}
        </option>
      </select>
    </div>
    <div class="col-md-6">
      <label class="form-label">Course</label>
      <select class="form-select" aria-label="Default select example" @change="selectCourse($event)">
        <option selected disabled>Choose Course</option>
        <option v-for="course in courses" :key="course.index" :value="course">
          {{ course }}
        </option>
      </select>
    </div>
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" class="form-control" placeholder="joshuaolufemi@email.com" required v-model="email">
    </div>
    <div class="col-md-6">
      <label class="form-label">Password</label>
      <input type="password" class="form-control" placeholder="Password" required v-model="password">
    </div>
    <div class="col-md-6">
      <label class="form-label">Confirm Password</label>
      <input type="password" class="form-control" placeholder="Confirm password" required v-model="confirmPassword">
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck" v-model="checked" required>
        <label class="form-check-label" for="gridCheck">
          Check here to indicate that you have read the <a href="#">Terms</a> & <a href="#">Conditions</a> of Cu-Wallet.
        </label>
      </div>
    </div>
    <div class="col-12 text-center">
      <button type="submit" class="btn btn-outline-dark btn-general mb-3" @click="registerStudent">Register</button>
      <p>Already have an account? <router-link to="/auth/login">Sign in</router-link></p>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'Student',
  data: () => ({
    firstName: '',
    lastName: '',
    matricNo: '',
    checked: false,
    levels: ['100', '200', '300', '400', '500'],
    selectedLevel: '',
    courses: [
      'ACCOUNTING',
      'ARCHITECTURE',
      'BANKING AND FINANCE',
      'BIOCHEMISTRY',
      'BIOLOGY',
      'BUILDING TECHNOLOGY',
      'BUSINESS ADMINISTRATION',
      'CHEMICAL ENGINEERING',
      'CIVIL ENGINEERING',
      'COMPUTER ENGINEERING',
      'COMPUTER SCIENCE',
      'DEMOGRAPHY AND SOCIAL STATISTICS',
      'ECONOMICS',
      'ELECTRICAL/ELECTRONICS ENGINEERING',
      'ENGLISH LANGUAGE',
      'ENTREPRENEURSHIP',
      'ESTATE MANAGEMENT',
      'FRENCH',
      'INDUSTRIAL RELATIONS',
      'INDUSTRIAL CHEMISTRY',
      'INDUSTRIAL MATHEMATICS',
      'INDUSTRIAL PHYSICS WITH APPLIED GEOPHYSICS',
      'INDUSTRIAL PHYSICS WITH ELECTRONICS AND IT APPLICATION',
      'INDUSTRIAL PHYSICS'
    ],
    selectedCourse: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    disabled: false
  }),

  methods: {
    selectLevel (event) {
      this.selectedLevel = event.target.value
    },
    selectCourse (event) {
      this.selectedCourse = event.target.value
    },
    async registerStudent () {
      try {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
          matric: this.matricNo,
          level: this.selectedLevel,
          course: this.selectedCourse,
          department: "science",
          // role: 'student'
        }
        if (data.password.length >= 6){
          if (data.password === data.confirmPassword){
            console.log(data)
          }
          else {
            alert('Password does not match')
          }
        }

        let result = await axios.post("http://localhost:3000/student/auth/signup", data)

        console.log(result)
        //I added this
        this.$router.push('/auth/login')



      } catch(e){
console.log(e);
      }


    }
  }
}
</script>

<style lang="css" scoped>
</style>
