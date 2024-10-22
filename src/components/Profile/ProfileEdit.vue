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
      <div class="toggle-container">
        <span class="toggle-label">{{ isTwoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA' }}</span>
        <button
          @click="handleToggleTwoFactorAuth"
          :class="['btn', 'small-toggle-button', isEnabling2FA ? 'toggle-on' : 'toggle-off']"
        ></button>
      </div>

      <!-- Show QR Code and input when enabling or disabling 2FA -->
      <div v-if="isEnabling2FA">
        <h4>{{ isTwoFactorEnabled ? 'Enter Secret Key to Disable 2FA' : 'Scan QR Code to Enable 2FA' }}</h4>
        <div v-if="!isTwoFactorEnabled" class="qr-code-wrapper">
          <img v-if="qrCodeDataURL" :src="qrCodeDataURL" alt="QR Code" class="qr-code" />

          <!-- This div will be used to animate the scanning line -->
          <div class="qr-scan-line"></div>
          <div class="border-top"></div>
          <div class="border-bottom"></div>
          <div class="border-left"></div>
          <div class="border-right"></div>
        </div>

        <!-- Input for OTP or password based on 2FA status -->
        <div class="form-group">
          <label for="secret">
            {{ isTwoFactorEnabled ? 'Enter Password to Disable' : 'Enter One Time Password' }}
          </label>
          <input
            v-if="!isTwoFactorEnabled"
            type="text"
            id="secret"
            v-model="enteredSecret"
            placeholder="Enter one time password"
          />
          <input
            v-if="isTwoFactorEnabled"
            type="password"
            id="password"
            v-model="disablePassword"
            placeholder="Enter your password"
            required
          />
        </div>

        <button @click="isTwoFactorEnabled ? disableTwoFactorAuth() : enableTwoFactorAuth()" class="btn btn-success small-button">
          {{ isTwoFactorEnabled ? 'Disable 2FA' : 'Verify and Enable 2FA' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
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
    const enteredSecret = ref('');
    const disablePassword = ref('');
    let qrCodeRefreshTimer = null;

    const userInitials = computed(() => {
      return user.value?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('') || '';
    });

    const userName = computed(() => user.value?.name || 'User');
    const userEmail = computed(() => user.value?.email || 'user@example.com');

    onMounted(() => {
      username.value = user.value?.name || '';

      // Retrieve and set the 2FA status from localStorage
      const twoFactorStatus = localStorage.getItem('twoFactorEnabled');
      isTwoFactorEnabled.value = twoFactorStatus === 'true';

      // Set an interval to refresh the QR code every 60 seconds
      if (!isTwoFactorEnabled.value) {
        qrCodeRefreshTimer = setInterval(() => {
          toggleTwoFactorAuth();
        }, 60000);
      }
    });

    onUnmounted(() => {
      // Clear the interval when the component is unmounted
      if (qrCodeRefreshTimer) {
        clearInterval(qrCodeRefreshTimer);
      }
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

    const handleToggleTwoFactorAuth = () => {
      isEnabling2FA.value = !isEnabling2FA.value;

      // Call API only when enabling 2FA
      if (!isTwoFactorEnabled.value && isEnabling2FA.value) {
        toggleTwoFactorAuth(); // Call the API to generate the secret key
      }
    };

    const toggleTwoFactorAuth = async () => {
      try {
        const response = await AuthApiServices.GetRequest('/generate-secret-key');
        const secretKey = response.data.google2fa_secret;
        const otpauthUrl = `otpauth://totp/UdemyCloneApp?secret=${secretKey}&issuer=UdemyCloneApp`;
        qrCodeDataURL.value = await QRCode.toDataURL(otpauthUrl);
      } catch (err) {
        console.error('Error generating secret key or QR code:', err);
      }
    };

    const enableTwoFactorAuth = async () => {
      try {
        const response = await AuthApiServices.PostRequest('/enable-2fa', {
          one_time_password: enteredSecret.value,
        });
        if (response.message === '2-Factor Authentication successfully enabled.') {
          alert('2FA enabled successfully!');
          isTwoFactorEnabled.value = true;
          isEnabling2FA.value = false;

          // Save 2FA status in localStorage
          localStorage.setItem('twoFactorEnabled', 'true');
        }
      } catch (error) {
        console.error('Error enabling 2FA:', error);
      }
    };

    const disableTwoFactorAuth = async () => {
      try {
        const response = await AuthApiServices.PostRequest('/disable-2fa', {
          password: disablePassword.value,
        });
        if (response.message === '2-Factor Authentication successfully disabled.') {
          alert('2FA has been successfully disabled.');
          isTwoFactorEnabled.value = false;
          isEnabling2FA.value = false;

          // Remove 2FA status from localStorage
          localStorage.setItem('twoFactorEnabled', 'false');
        }
      } catch (error) {
        console.error('Error disabling 2FA:', error);
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
      enteredSecret,
      disablePassword,
      saveProfile,
      handleToggleTwoFactorAuth,
      enableTwoFactorAuth,
      disableTwoFactorAuth,
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

/* QR code Styling start from here */
.qr-code-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;    
  width: 220px; 
  height: 220px;
  margin: 20px auto;
}

.qr-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 7px;
  background-color: rgba(0, 255, 0, 0.6); 
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

.qr-code {
  width: 200px; 
  height: 200px;
  display: block;
}

.border-top,
.border-bottom,
.border-left,
.border-right {
  position: absolute;
  background-color: grey;
}

.border-left,
.border-right {
  top: 0;
  width: 4px;
  height: 100%;
}

.border-left {
  left: -10px; 
}

.border-right {
  right: -10px;
}

.border-top,
.border-bottom {
  left: 0;
  width: 100%;
  height: 4px;
}

.border-top {
  top: -10px; 
}

.border-bottom {
  bottom: -10px; 
}

/* QR Code styling End here */

/* Toggle button */
.toggle-container {
  display: flex;
  align-items: center;
}

.toggle-label {
  margin-right: 10px; 
  font-size: 14px;
  color: #333;
}

.small-toggle-button {
  width: 50px;
  height: 25px;
  background-color: grey;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.small-toggle-button::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 3px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.small-toggle-button.toggle-on {
  background-color: green;
}

.small-toggle-button.toggle-on::before {
  transform: translateX(25px);
}

.small-toggle-button.toggle-off {
  background-color: grey;
}

.small-toggle-button.toggle-off::before {
  transform: translateX(0px);
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