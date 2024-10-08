<template>
    <div class="container-fluid d-flex align-items-center justify-content-center bg-white my-4">
      <div class="row w-75 shadow-lg">
        
        <!-- Left Side - Picture -->
        <div class="col-md-7 p-0 bg-white">
          <img :src="require('@/assets/signup-pic.png')" alt="Signup Image" class="img-fluid w-100 h-100" />
        </div>
        
        <!-- Right Side - Signup Form -->
        <div class="col-md-5 bg-white p-5">
          <h1 class="mb-4 fs-3 fw-bold">Sign up and start learning</h1>
          
          <!-- Signup Form -->
          <form @submit.prevent="submitForm">
            
            <!-- Full Name -->
            <div class="mb-3 inputs position-relative">
              <input type="text" id="fullName" v-model="fullName" class="form-control border-0" required placeholder=" " />
              <label for="fullName" class="form-label">Full Name</label>
            </div>
            
            <!-- Email -->
            <div class="mb-3 inputs position-relative">
              <input type="email" id="email" v-model="email" class="form-control border-0" required placeholder=" " />
              <label for="email" class="form-label">Email</label>
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>
            
            <!-- Password -->
            <div class="mb-3 inputs position-relative">
              <input type="password" id="password" v-model="password" class="form-control border-0" required minlength="8" placeholder=" " />
              <label for="password" class="form-label">Password</label>
              <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
            </div>
            
            <!-- Terms Checkbox -->
            <div class="mb-3 form-check">
              <input type="checkbox" id="terms" v-model="acceptedTerms" class="form-check-input" required />
              <label class="form-check-label" for="terms">Send me special offers, personalized recommendations, and learning tips.</label>
            </div>
            
            <!-- Signup Button -->
            <button type="submit" class="btn signup-btn w-100 rounded-0 fw-bold">Sign Up</button>
          </form>
          <div class="mt-2 terms p-4">
            <p>By signing up, you agree to our <a href="#">Terms</a> of Use and <a href="#">Privacy Policy</a>.</p>
          </div>
  
          <!-- Already Have an Account -->
          <div class="mt-3 text-center already-account p-3">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const fullName = ref('');
  const email = ref('');
  const password = ref('');
  const acceptedTerms = ref(false);
  const emailError = ref('');
  const passwordError = ref('');
  
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  function submitForm() {
    emailError.value = '';
    passwordError.value = '';
    
    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address';
    }
  
    if (password.value.length < 8) {
      passwordError.value = 'Password must be at least 8 characters';
    }
  
    if (!emailError.value && !passwordError.value && acceptedTerms.value) {
      alert('Form submitted successfully');
      // Further submission logic goes here
    }
  }
  </script>
  
  <style scoped>
  .signup-btn {
    background-color: #8710D8;
    color: #fff;
    border: none;
  }
  
  .signup-btn:hover {
    background-color:#7f0fc9;
    color:white;
  }
  
  .container-fluid {
    background-color: #f9f9f9;
  }
  .already-account {
    background-color: #F7F9FA;
  }
  .already-account a {
    color:#8710D8;
    font-weight: bold;
  }
  .terms p {
    font-size: 14px;
    justify-content: center;
  }
  .terms a {
    color: #8710D8;
  }
  .form-check-label {
    font-size: smaller;
  }
  .inputs {
    position: relative;
    border: 1px solid black;
    height: 10vh;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
  }
  .form-label {
    position: absolute;
    top: 1.3rem;
    left: 0.75rem;
    font-size: 14px;
    color: #000000;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
    pointer-events: none;
  }
  input:focus + .form-label,
  input:not(:placeholder-shown) + .form-label {
    top: -0rem;
    left: 0.75rem;
    font-size: 0.75rem;
    margin-bottom: 0%;

  }

  input {
    background-color: transparent;
    outline: none;
    box-shadow: none;
    height: 4vh;
  }
  input:focus{
    border: none;
    box-shadow: none;
  }
  </style>
