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
        
        <!-- Success and Error Popup Components -->
        <SuccessPopupComponent :show="showSuccess" :message="successMessage" />
        <ErrorPopupComponent :show="showError" :message="errorMessage" />

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
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Import useStore
import SuccessPopup from '../SuccessPopup.vue'; // Adjust the path as necessary
import ErrorPopup from '../ErrorPopup.vue'; // Adjust the path as necessary

const SuccessPopupComponent = defineComponent(SuccessPopup);
const ErrorPopupComponent = defineComponent(ErrorPopup);
const router = useRouter();
const store = useStore(); // Create store instance

const fullName = ref('');
const email = ref('');
const password = ref('');
const acceptedTerms = ref(false);
const emailError = ref('');
const passwordError = ref('');
const showSuccess = ref(false);
const showError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

async function submitForm() {
  emailError.value = '';
  passwordError.value = '';

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address';
    return;
  }

  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
    return;
  }

  if (!acceptedTerms.value) {
    errorMessage.value = 'You must accept the terms to continue';
    showError.value = true;
    return;
  }

  // Create a FormData object to hold the form data
  const formData = new FormData();
  formData.append('name', fullName.value);
  formData.append('email', email.value);
  formData.append('password', password.value);
  formData.append('password_confirmation', password.value); // Same password for confirmation

  try {
    const response = await store.dispatch('registerUser', formData);

    // Log the full response for debugging
    console.log('Registration response:', response);

    // Check for success response
    if (response.success) {
      // Set success message and show the popup
      successMessage.value = response.message; // Use the success message from the response
      showSuccess.value = true;

      // Hide success popup after 2 seconds and redirect to login page
      setTimeout(() => {
        showSuccess.value = false;
        router.push('/login');
      }, 2000); // 2000 milliseconds = 2 seconds
    } else {
      throw new Error('Unexpected response');
    }
  } catch (error) {
    // Handle error response
    errorMessage.value = error.message || 'An error occurred. Please try again later.';
    showError.value = true;

    // Hide error popup after 5 seconds
    setTimeout(() => {
      showError.value = false; // Hide error popup
    }, 5000); // 5000 milliseconds = 5 seconds
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

input:focus {
  border: none;
  box-shadow: none;
}
/* Custom checkbox style */
.form-check-input{
  height: 20px;
  width: 20px;
  border-color: #000000;
}
.form-check-input:checked {
  background-color: black;
  border-color: black;
}


.form-check-input {
  accent-color: black; /* Modern browsers support this property for changing checkbox color */
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: auto;
    padding: 20px;
    box-sizing: border-box;
  }

  .row {
    flex-direction: column;
    align-items: center;
    width: 100% !important;
    margin: 0;
    padding: 0;
  }

  /* Hide image container on mobile view */
  .col-md-7.p-0.bg-white {
    display: none; /* Hide the image on mobile screens */
  }

  .col-md-5.bg-white.p-5 {
    width: 100%;
    padding: 20px;
    text-align: center;
  }

  .col-md-5.bg-white.p-5 h1 {
    font-size: 20px; /* Adjust heading font size */
    margin-top: 10px;
    line-height: 1.4;
  }

  .inputs {
    height: 60px; /* Adjust input field height */
  }

  /* Adjust input font size */
  input {
    height: 45px;
    font-size: 16px;
  }

  .form-label {
    font-size: 16px;
  }

  .signup-btn {
    font-size: 18px;
    padding: 14px;
  }

  .form-check-label {
    font-size: 14px;
  }

  .terms p {
    font-size: 12px;
  }

  .already-account p {
    font-size: 14px;
  }

  .already-account a {
    font-size: 16px;
  }
}
</style>