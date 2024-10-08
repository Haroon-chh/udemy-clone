<template>
    <div class="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div class="row w-75 shadow-lg">
        
        <!-- Left Side - Picture -->
        <div class="col-md-6 p-0">
          <img src="/src/assets/signup-pic.png" alt="Signup Image" class="img-fluid w-100 h-100" />
        </div>
        
        <!-- Right Side - Signup Form -->
        <div class="col-md-6 bg-white p-5">
          <h1 class="mb-4">Sign up and start learning</h1>
          
          <!-- Signup Form -->
          <form @submit.prevent="submitForm">
            
            <!-- Full Name -->
            <div class="mb-3">
              <label for="fullName" class="form-label">Full Name</label>
              <input type="text" id="fullName" v-model="fullName" class="form-control" required />
            </div>
            
            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" v-model="email" class="form-control" required />
              <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>
            
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" v-model="password" class="form-control" required minlength="8" />
              <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
            </div>
            
            <!-- Terms Checkbox -->
            <div class="mb-3 form-check">
              <input type="checkbox" id="terms" v-model="acceptedTerms" class="form-check-input" required />
              <label class="form-check-label" for="terms">I accept the Terms and Conditions</label>
            </div>
            
            <!-- Signup Button -->
            <button type="submit" class="btn signup-btn w-100">Sign Up</button>
          </form>
  
          <!-- Already Have an Account -->
          <div class="mt-4 text-center">
            Already have an account? <a href="#">Log in</a>
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
    background-color: #343a40;
    color: #fff;
    border: none;
  }
  
  .signup-btn:hover {
    background-color: #50575e;
  }
  
  .container-fluid {
    background-color: #f9f9f9;
  }
  </style>
  