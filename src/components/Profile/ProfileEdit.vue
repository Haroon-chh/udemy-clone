<template>
  <div class="profile-edit-container">
    <div class="profile-header">
      <button class="profile-circle">{{ userInitials }}</button>
      <h3 class="profile-name">{{ userName }}</h3>
      <p class="profile-email">
        <span class="material-icons lock-icon">lock</span>
        {{ userEmail }}
      </p>
    </div>

    <form @submit.prevent="saveProfile" class="profile-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>

    <div class="change-password-section">
      <p>If you want to update your password, click the button below.</p>
      <router-link to="/change-password" class="btn btn-link">
        Change Password
      </router-link>
    </div>

    <!-- Two-Factor Authentication Section -->
    <div class="two-factor-section">
      <p>Two-Factor Authentication</p>
      <button @click="toggleTwoFactorAuth" class="btn btn-primary small-button">
        {{ isTwoFactorEnabled ? 'Disable' : 'Enable' }} 2FA
      </button>

      <!-- Show QR Code and input when enabling or disabling 2FA -->
      <div v-if="isEnabling2FA">
        <h4>{{ isTwoFactorEnabled ? 'Enter Secret Key to Disable 2FA' : 'Scan QR Code to Enable 2FA' }}</h4>
        <img v-if="!isTwoFactorEnabled && qrCodeDataURL" :src="qrCodeDataURL" alt="QR Code" class="qr-code" />
        <img v-if="isTwoFactorEnabled && disableQrCodeDataURL" :src="disableQrCodeDataURL" alt="QR Code" class="qr-code" />

        <!-- Input to enter the secret key -->
        <div class="form-group">
          <label for="secret">{{ isTwoFactorEnabled ? 'Enter Secret Key to Disable' : 'Enter Secret Key from Console' }}</label>
          <input type="text" id="secret" v-model="enteredSecret" placeholder="Enter secret key" />
        </div>

        <!-- Submit button for 2FA verification -->
        <button @click="verifySecret" class="btn btn-success small-button">{{ isTwoFactorEnabled ? 'Disable 2FA' : 'Verify and Enable 2FA' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
// import * as speakeasy from 'speakeasy';
import AuthApiServices from '@/services/AuthApiServices.js';
import QRCode from 'qrcode';

export default {
  name: 'ProfileEdit',
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getLoggedUser);
    const username = ref('');
    const isTwoFactorEnabled = ref(false);
    const isEnabling2FA = ref(false);
    const qrCodeDataURL = ref('');
    const disableQrCodeDataURL = ref('');
    const enteredSecret = ref('');
    const generatedSecret = ref('');
    const disableGeneratedSecret = ref('');

    const userInitials = computed(() => {
      return user.value?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || '';
    });

    const userName = computed(() => user.value?.name || 'User');
    const userEmail = computed(() => user.value?.email || 'user@example.com');

    onMounted(() => {
      username.value = user.value?.name || '';
      // Retrieve the 2FA status from localStorage
      const twoFactorStatus = localStorage.getItem('twoFactorEnabled');
      isTwoFactorEnabled.value = twoFactorStatus === 'true';
    });

    const saveProfile = async () => {
      try {
        await store.dispatch('updateUserProfile', { name: username.value });
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    };

    // Function to toggle 2FA
    const toggleTwoFactorAuth = async () => {
      isEnabling2FA.value = true;
      generatedSecret.value = ''; // Clear the secret key input field when toggling

      if (!isTwoFactorEnabled.value) {
        // Enable 2FA: Call API to generate secret and QR code using GET request
        try {
          const response = await AuthApiServices.GetRequest('/generate-secret-key'); // Call API using GetRequest
          const secretKey = response.data.google2fa_secret; // Get secret key from response
          generatedSecret.value = secretKey;

          const otpauthUrl = `otpauth://totp/UdemyCloneApp?secret=${secretKey}&issuer=UdemyCloneApp`; // Create otpauth URL

          // Generate QR code from otpauth URL
          const qrCodeURL = await QRCode.toDataURL(otpauthUrl);
          qrCodeDataURL.value = qrCodeURL;

          console.log('Generated Secret Key:', generatedSecret.value);
        } catch (err) {
          console.error('Error generating secret key or QR code:', err);
        }
      } else {
        // Handle disable 2FA logic here (if needed)
        try {
          const disableSecret = 'DISABLE_2FA_SECRET'; // Example secret, you may adjust this logic
          disableGeneratedSecret.value = disableSecret;

          const disableOtpauthUrl = `otpauth://totp/UdemyCloneApp?secret=${disableSecret}&issuer=UdemyCloneApp`;
          const disableQrCodeURL = await QRCode.toDataURL(disableOtpauthUrl);
          disableQrCodeDataURL.value = disableQrCodeURL;

          console.log('Generated Disable Secret Key:', disableGeneratedSecret.value);
        } catch (err) {
          console.error('Error generating disable QR code:', err);
        }
      }
    };

    const verifySecret = async () => {
      if ((!isTwoFactorEnabled.value && enteredSecret.value === generatedSecret.value) ||
          (isTwoFactorEnabled.value && enteredSecret.value === disableGeneratedSecret.value)) {
        if (isTwoFactorEnabled.value) {
          alert('2FA disabled successfully!');
          localStorage.setItem('twoFactorEnabled', 'false'); // Save status to localStorage
          await store.dispatch('disableTwoFactorAuth', { userId: user.value?.id });
        } else {
          alert('2FA enabled successfully!');
          localStorage.setItem('twoFactorEnabled', 'true'); // Save status to localStorage
          await store.dispatch('enableTwoFactorAuth', { userId: user.value?.id, secret: generatedSecret.value });
        }
        isTwoFactorEnabled.value = !isTwoFactorEnabled.value;
        isEnabling2FA.value = false;
      } else {
        alert('Invalid secret key, please try again.');
      }
    };

    return {
      username,
      userInitials,
      userName,
      userEmail,
      isTwoFactorEnabled,
      isEnabling2FA,
      qrCodeDataURL,
      disableQrCodeDataURL,
      enteredSecret,
      saveProfile,
      toggleTwoFactorAuth,
      verifySecret,
    };
  },
};
</script>

<style scoped>
.profile-edit-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.qr-code {
  margin: 20px auto;
  display: block;
  width: 200px;
  height: 200px;
}

.form-group {
  margin-top: 15px;
}

input {
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-primary,
.btn-success {
  margin-top: 15px;
  background-color: #a436f1;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
}

.small-button {
  width: auto;
  padding: 10px 20px;
}

.two-factor-section {
  margin-top: 30px;
}

.change-password-section {
  background-color: #e9ecef;
  padding: 15px;
  border-radius: 8px;
  margin-top: 30px;
  text-align: center;
}

.profile-header {
  text-align: center;
  margin-bottom: 30px;
}

.profile-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #2e2f31;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2em;
  margin: 0 auto;
}

.profile-name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.5em;
}

.profile-email {
  font-size: 1em;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.lock-icon {
  margin-right: 5px;
  font-size: 1.2em;
}
</style>
