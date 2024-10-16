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
          <div class="mb-3 inputs position-relative" v-if="!requires2FA">
            <input type="email" id="email" v-model="email" class="form-control border-0" required placeholder="" />
            <label for="email" class="form-label">Email</label>
            <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          </div>

          <!-- Password -->
          <div class="mb-3 inputs position-relative" v-if="!requires2FA">
            <input type="password" id="password" v-model="password" class="form-control border-0" required minlength="8" placeholder="" />
            <label for="password" class="form-label">Password</label>
            <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
          </div>

          <!-- 2FA TOTP Code Input -->
          <div v-if="requires2FA">
            <h4>Enter the 2FA code from your authenticator app</h4>
            <div class="mb-3 inputs position-relative">
              <input type="text" v-model="enteredTOTP" class="form-control border-0" placeholder="Enter your 2FA code" />
              <div v-if="totpError" class="text-danger">{{ totpError }}</div>
            </div>
          </div>

          <!-- QR Code for 2FA Setup -->
          <div v-if="showQrCode">
            <h4>Scan the QR Code</h4>
            <img :src="qrCodeDataURL" alt="QR Code" class="qr-code" />
          </div>

          <!-- Log In or Verify Button -->
          <button type="submit" class="btn login-btn w-100 rounded-0">
            {{ requires2FA ? 'Verify 2FA' : 'Log In' }}
          </button>
        </form>

        <!-- Other Log In Options -->
        <div class="mt-4 text-center" v-if="!requires2FA">
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
import QRCode from 'qrcode';
import { authenticator } from 'otplib'; // Use otplib for TOTP
import SuccessPopup from '../SuccessPopup.vue';
import ErrorPopup from '../ErrorPopup.vue';

const SuccessPopupComponent = defineComponent(SuccessPopup);
const ErrorPopupComponent = defineComponent(ErrorPopup);

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const totpError = ref('');
const enteredTOTP = ref('');
const showQrCode = ref(false);
const qrCodeDataURL = ref('');
const requires2FA = ref(false);
const secret = ref(''); // Store the secret key generated for TOTP

const router = useRouter();
const store = useStore();

const showSuccess = ref(false);
const showError = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

// Validation function for email
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Handle form submission (login or 2FA verification)
const submitForm = async () => {
  emailError.value = '';
  passwordError.value = '';
  totpError.value = '';

  if (!requires2FA.value) {
    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address';
      return;
    }

    if (password.value.length < 8) {
      passwordError.value = 'Password must be at least 8 characters';
      return;
    }

    try {
      // Step 1: Normal login process
      const response = await store.dispatch('loginUser', {
        email: email.value,
        password: password.value,
      });

      // Simulate 2FA status with localStorage
      const twoFactorEnabled = localStorage.getItem('twoFactorEnabled') === 'true';

      if (twoFactorEnabled) {
        // Step 2: User has 2FA enabled, show secret input
        requires2FA.value = true;
        generateQrCode(); // Generate the QR code for TOTP setup
      } else if (response.success) {
        // Proceed to dashboard if no 2FA is required
        successMessage.value = response.message;
        showSuccess.value = true;

        setTimeout(() => {
          showSuccess.value = false;
          router.push('/dashboard');
        }, 2000);
      } else {
        throw new Error(response.message || 'Unexpected response format');
      }
    } catch (error) {
      console.error('Error during login:', error);
      errorMessage.value = error.response?.data.errors?.credentials?.[0] || 'An error occurred. Please try again later.';
      showError.value = true;

      setTimeout(() => {
        showError.value = false;
      }, 5000);
    }
  } else {
    // Step 3: Verify the TOTP code using otplib
    if (!enteredTOTP.value) {
      totpError.value = 'Please enter the 2FA code.';
      return;
    }

    // Verify the TOTP code entered by the user
    const verified = authenticator.check(enteredTOTP.value, secret.value);

    if (verified) {
      successMessage.value = '2FA verified successfully!';
      showSuccess.value = true;

      setTimeout(() => {
        showSuccess.value = false;
        router.push('/dashboard');
      }, 2000);
    } else {
      totpError.value = 'Invalid 2FA code, please try again.';
    }
  }
};

// Generate QR code for 2FA if needed
const generateQrCode = async () => {
  secret.value = authenticator.generateSecret(); // Generate a TOTP secret

  const otpauthUrl = authenticator.keyuri(email.value, 'UdemyCloneApp', secret.value);

  try {
    const qrCodeURL = await QRCode.toDataURL(otpauthUrl);
    qrCodeDataURL.value = qrCodeURL;
    showQrCode.value = true;
    console.log('2FA Secret:', secret.value); // Output secret for debugging
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};

function socialLogin(provider) {
  alert(`Log in with ${provider} clicked`);
}
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

.qr-code {
  margin: 20px 0;
  width: 200px;
  height: 200px;
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
  height: 70px;
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
}

input {
  background-color: transparent;
  outline: none;
  box-shadow: none;
  height: 30px;
  font-size: 16px;
  padding: 0 12px;
}

input:focus {
  border: none;
  box-shadow: none;
}

input:not(:placeholder-shown) {
  border: none;
  box-shadow: none;
}
</style>
