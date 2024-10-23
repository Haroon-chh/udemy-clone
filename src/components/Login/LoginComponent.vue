<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100">
    <div class="row w-75 shadow-lg">
      
      <!-- Left Side - Picture -->
      <div class="col-md-6 p-0">
        <img :src="require('@/assets/signup-pic.png')" alt="Login Image" class="img-fluid w-100 h-100" />
      </div>
      
      <!-- Right Side - Login Form -->
      <div class="col-md-6 bg-white p-5">
        <h1 class="mb-4">Log in to your account</h1>
        
        <!-- Success and Error Popup Components -->
        <SuccessPopupComponent :show="showSuccess" :message="successMessage" />
        <ErrorPopupComponent :show="showError" :message="errorMessage" />
        
        <!-- Login Form -->
        <form @submit.prevent="submitForm">
          
          <!-- Email -->
          <div class="mb-3 inputs position-relative">
            <input type="email" id="email" v-model="email" class="form-control border-0" required placeholder="" />
            <label for="email" class="form-label">Email</label>
            <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          </div>
          
          <!-- Password -->
          <div class="mb-3 inputs position-relative">
            <input type="password" id="password" v-model="password" class="form-control border-0" required minlength="8" placeholder="" />
            <label for="password" class="form-label">Password</label>
            <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
          </div>
          
          <!-- Login Button -->
<!-- Login Button -->
            <button type="submit" class="btn login-btn w-100 rounded-0" :disabled="loginDisabled">Log In</button>
        </form>

        <!-- Other Log In Options -->
        <div class="mt-4 text-center">
          <div class="separator">Other log in options</div>
          <div class="social-icons d-flex justify-content-center my-3">
            <button class="btn btn-outline-secondary mx-2" @click="socialLogin('Google')">
              <i class="fab fa-google"></i> <!-- Google Icon -->
            </button>
            <button class="btn btn-outline-secondary mx-2" @click="socialLogin('Facebook')">
              <i class="fab fa-facebook-f"></i> <!-- Facebook Icon -->
            </button>
            <button class="btn btn-outline-secondary mx-2" @click="socialLogin('Apple')">
              <i class="fab fa-apple"></i> <!-- Apple Icon -->
            </button>
          </div>
        </div>

        <!-- Modal for 2FA Verification -->
        <div v-if="show2FAModal" class="modal show d-block" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Enter 2FA Code</h5>
                <button type="button" class="btn-close" @click="show2FAModal = false"></button>
              </div>
              <div class="modal-body">
                <input type="text" v-model="otp" maxlength="6" class="form-control" placeholder="6-digit code" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="verify2FA">Verify</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Don't Have an Account & Organization Login -->
        <div class="mt-4 text-center">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
        <div class="mt-2 text-center">
          <a href="#" class="organization-login">Log in with your organization</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SuccessPopup from '../SuccessPopup.vue'; // Adjust path if necessary
import ErrorPopup from '../ErrorPopup.vue'; // Adjust path if necessary

const SuccessPopupComponent = defineComponent(SuccessPopup);
const ErrorPopupComponent = defineComponent(ErrorPopup);

const email = ref('');
const password = ref('');
const otp = ref(''); // OTP input for 2FA

const emailError = ref('');
const passwordError = ref('');
const router = useRouter();
const store = useStore();

const show2FAModal = ref(false); // 2FA modal visibility state
const showSuccess = ref(false);
const showError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const loginDisabled = ref(false); // State to disable the login button

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const submitForm = async () => {
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

  try {
    const response = await store.dispatch('loginUser', {
      email: email.value,
      password: password.value,
    });

    if (response.success) {
      const is2FAEnabled = response.data?.['2fa'] === true; // Double-check evaluation

      if (is2FAEnabled) {
        show2FAModal.value = true; // Show the modal
      } else {
        successMessage.value = response.message;
        showSuccess.value = true;

        setTimeout(() => {
          showSuccess.value = false;
          router.push('/dashboard'); // Redirect if 2FA is not required
        }, 2000);
      }
    } else {
      throw new Error(response.message || 'Unexpected response format');
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.errors?.credentials?.[0] ||
      'An error occurred. Please try again later.';
    showError.value = true;
    
    // Disable the login button for 10 seconds after an error
    loginDisabled.value = true;
    setTimeout(() => {
      loginDisabled.value = false;
    }, 10000);

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  }
};

const verify2FA = async () => {
  try {
    const response = await store.dispatch('verify2FA', { otp: otp.value });

    if (response.success) {
      show2FAModal.value = false; // Hide 2FA modal
      successMessage.value = '2FA verified successfully!';
      showSuccess.value = true;

      setTimeout(() => {
        showSuccess.value = false;
        router.push('/dashboard'); // Redirect after successful 2FA verification
      }, 2000);
    } else {
      throw new Error(response.message || 'Invalid 2FA code');
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.errors?.one_time_password?.[0] ||
      'Invalid 2FA code. Please try again.';
    showError.value = true;

    setTimeout(() => {
      showError.value = false;
    }, 5000);
  }
};

</script>


<style scoped>
.login-btn {
  background-color: #a436f1;
  color: #fff;
  border: none;
}

.login-btn:hover {
  background-color: #50575e;
}

.separator {
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 14px;
  color: #888;
  margin: 20px 0;
}

.separator::before,
.separator::after {
  content: '';
  border-top: 1px solid #ddd;
  width: 100px;
  margin: 0 10px;
}

.social-icons i {
  font-size: 24px;
}

.organization-login {
  color: #6c63ff;
  font-weight: 600;
}

.organization-login:hover {
  text-decoration: underline;
}

.container-fluid {
  background-color: #f9f9f9;
}

.text-center a {
  color: #6c63ff;
  font-weight: 600;
}

.text-center a:hover {
  text-decoration: underline;
}

.inputs {
  position: relative;
  border: 1px solid black;
  height: 70px; /* Increased height for inputs */
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 20px;
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
  height: 30px;
  font-size: 16px; /* Font size for input text */
  padding: 0 12px; /* Padding inside input */
}

input:focus {
  border: none;
  box-shadow: none;
}

input:not(:placeholder-shown) {
  border: none;
  box-shadow: none;
}

@media (max-width: 768px) {
  /* Container adjustments to reduce free space */
  .container-fluid {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align content at the start */
    height: auto; /* Remove full height constraint */
    padding: 20px; /* General padding */
    box-sizing: border-box;
  }

  /* Ensure the row does not overflow and centers */
  .row {
    flex-direction: column;
    align-items: center;
    width: 100% !important;
    margin: 0; /* Remove any default margins */
    padding: 0; /* Remove any default paddings */
  }

  /* Hide the image container on mobile view */
  .col-md-6.p-0 {
    display: none; /* Hide the image on mobile screens */
  }

  /* Adjust login form section */
  .col-md-6.bg-white.p-5 {
    width: 100%;
    padding: 20px;
    text-align: center;
  }

  /* Adjust heading text */
  .col-md-6.bg-white.p-5 h1 {
    font-size: 16px; /* Smaller font size for mobile */
    margin-top: 10px;
    line-height: 1.4;
  }

  /* Keep social icons in a single line */
  .social-icons {
    flex-direction: row !important;
    justify-content: center;
    flex-wrap: nowrap;
  }

  /* Adjust social button size and spacing */
  .social-icons button {
    width: auto;
    margin: 0 8px;
    font-size: 18px;
    padding: 10px;
  }

  /* Adjust form fields and buttons */
  .form-control {
    font-size: 14px;
    padding: 10px;
  }

  /* Adjust button styling */
  .btn {
    font-size: 16px;
    padding: 12px;
  }

  /* Adjust separator width */
  .separator {
    width: 100% !important;
  }

  /* Adjust text alignment and spacing */
  .text-center h1 {
    font-size: 16px;
    margin-top: 10px;
    color: #333;
  }

  /* Adjust anchor link styles */
  .text-center a {
    display: block;
    margin: 5px 0;
    font-size: 14px;
  }

  /* Adjust organization login link */
  .organization-login {
    font-size: 14px;
  }

  /* Adjust text center alignment */
  .text-center {
    font-size: 14px;
  }

  /* Ensure footer is at the bottom without extra margin */
  footer {
    width: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    text-align: center;
    box-sizing: border-box;
    position: relative; /* Ensure footer stays below content */
  }
}
</style>