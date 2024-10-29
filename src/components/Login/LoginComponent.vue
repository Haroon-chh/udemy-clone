<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100">
    <div class="row w-75 shadow-lg">
      
      <!-- Left Side - Picture -->
      <div class="col-md-6 p-0">
        <img :src="require('@/assets/signup-pic.png')" alt="Login Image" class="img-fluid w-100 h-100" />
      </div>
      
      <!-- Right Side - Login and 2FA Forms -->
      <div class="col-md-6 bg-white p-5">
        <h1 class="mb-4">Log in to your account</h1>
        
        <!-- Success and Error Popup Components -->
        <SuccessPopupComponent :show="showSuccess" :message="successMessage" />
        <ErrorPopupComponent :show="showError" :message="errorMessage" />

        <!-- Login Form -->
        <div v-if="!is2FAEnabled">
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
            <button type="submit" class="btn login-btn w-100 rounded-0" :disabled="loginDisabled">Log In</button>
          </form>
        </div>

        <!-- 2FA OTP Input Fields -->
        <div v-else class="otp-container">
          <h5 class="mb-3">Enter 2FA Code</h5>
          <div class="otp-inputs">
            <input v-for="(digit, index) in otpDigits" :key="index" v-model="otpDigits[index]" maxlength="1" @input="moveFocus(index)" type="text" class="otp-box border-1" />
          </div>
          <button class="btn otp-btn w-100 mt-3 rounded-0" @click="verify2FA">Verify</button>
        </div>

        <!-- Other Log In Options -->
        <div class="mt-4 text-center" v-if="!is2FAEnabled">
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

        <!-- Sign Up Option -->
        <div class="mt-4 text-center">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import SuccessPopup from '../SuccessPopup.vue';
import ErrorPopup from '../ErrorPopup.vue';

const SuccessPopupComponent = defineComponent(SuccessPopup);
const ErrorPopupComponent = defineComponent(ErrorPopup);

const email = ref('');
const password = ref('');
const otpDigits = ref(Array(6).fill('')); // Array for 6 OTP boxes

const emailError = ref('');
const passwordError = ref('');
const router = useRouter();
const store = useStore();

const is2FAEnabled = ref(false); // Track 2FA state
const showSuccess = ref(false);
const showError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const loginDisabled = ref(false);

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

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
      is2FAEnabled.value = response.data?.['2fa'] === true;

      if (!is2FAEnabled.value) {
        successMessage.value = response.message;
        showSuccess.value = true;
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    } else {
      throw new Error(response.message || 'Unexpected response format');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.errors?.credentials?.[0] || 'An error occurred. Please try again later.';
    showError.value = true;
    loginDisabled.value = true;
    setTimeout(() => { loginDisabled.value = false; }, 10000);
    setTimeout(() => { showError.value = false; }, 5000);
  }
};

const verify2FA = async () => {
  const otp = otpDigits.value.join('');
  if (otp.length !== 6) {
    errorMessage.value = 'Please enter a 6-digit code';
    showError.value = true;
    return;
  }

  try {
    const response = await store.dispatch('verify2FA', { otp });
    if (response.success) {
      successMessage.value = '2FA verified successfully!';
      showSuccess.value = true;
      setTimeout(() => router.push('/dashboard'), 2000);
    } else {
      throw new Error(response.message || 'Invalid 2FA code');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.errors?.one_time_password?.[0] || 'Invalid 2FA code. Please try again.';
    showError.value = true;
    setTimeout(() => { showError.value = false; }, 5000);
  }
};

const moveFocus = (index) => {
  if (otpDigits.value[index].length === 1 && index < 5) {
    document.querySelectorAll('.otp-box')[index + 1].focus();
  }
};
</script>



<style scoped>
.login-btn {
  background-color: #a436f1;
  color: #fff;
  border: none;
}

.otp-btn {
  background-color: #a436f1;
  color: #fff;
  border: none;
}

.login-btn:hover {
  background-color: #50575e;
}

.otp-btn:hover{
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
  .container-fluid {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align content at the start */
    height: auto; /* Remove full height constraint */
    padding: 20px; /* General padding */
    box-sizing: border-box;
  }

  .row {
    flex-direction: column;
    align-items: center;
    width: 100% !important;
    margin: 0; /* Remove any default margins */
    padding: 0; /* Remove any default paddings */
  }

  .col-md-6.p-0 {
    display: none; /* Hide the image on mobile screens */
  }

  .col-md-6.bg-white.p-5 {
    width: 100%;
    padding: 20px;
    text-align: center;
  }

  .col-md-6.bg-white.p-5 h1 {
    font-size: 16px; /* Smaller font size for mobile */
    margin-top: 10px;
    line-height: 1.4;
  }

  .social-icons {
    flex-direction: row !important;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .social-icons button {
    width: auto;
    margin: 0 8px;
    font-size: 18px;
    padding: 10px;
  }

  .form-control {
    font-size: 14px;
    padding: 10px;
  }

  .btn {
    font-size: 16px;
    padding: 12px;
  }

  .separator {
    width: 100% !important;
  }

  .text-center h1 {
    font-size: 16px;
    margin-top: 10px;
    color: #333;
  }

  .text-center a {
    display: block;
    margin: 5px 0;
    font-size: 14px;
  }

  .organization-login {
    font-size: 14px;
  }

  .text-center {
    font-size: 14px;
  }

  footer {
    width: 100%;
    padding: 10px;
    background-color: #f9f9f9;
    text-align: center;
    box-sizing: border-box;
    position: relative; 
  }
}
.otp-container {
  text-align: center;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: fit-content;
}

.otp-box {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #2f2f2f  !important; 
  margin: 0 5px;
  box-sizing: border-box; 
}



.separator {
  margin-top: 10px;
  font-size: 14px;
  color: #080808;
}

</style>