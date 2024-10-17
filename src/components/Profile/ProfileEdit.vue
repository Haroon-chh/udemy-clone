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
          <label for="secret">{{ isTwoFactorEnabled ? 'Enter Password to Disable' : 'Enter One Time Password' }}</label>
          <input type="text" id="secret" v-model="enteredSecret" placeholder="Enter one time password" />
        </div>
        
        <!-- Update Template -->
<div class="form-group" v-if="isTwoFactorEnabled">
  <label for="password">Enter Password to Disable 2FA</label>
  <input type="password" id="password" v-model="disablePassword" placeholder="Enter your password" required />
</div>
<button @click="isTwoFactorEnabled ? disableTwoFactorAuth() : enableTwoFactorAuth()" class="btn btn-success small-button">{{ isTwoFactorEnabled ? 'Disable 2FA' : 'Verify and Enable 2FA' }}</button>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
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
    const disableQrCodeDataURL = ref('');
    const enteredSecret = ref('');
    const generatedSecret = ref('');
    const disablePassword = ref(''); // New ref for the password input

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

    const toggleTwoFactorAuth = async () => {
      isEnabling2FA.value = true;
      generatedSecret.value = '';

      if (!isTwoFactorEnabled.value) {
        try {
          const response = await AuthApiServices.GetRequest('/generate-secret-key');
          const secretKey = response.data.google2fa_secret;
          generatedSecret.value = secretKey;

          const otpauthUrl = `otpauth://totp/UdemyCloneApp?secret=${secretKey}&issuer=UdemyCloneApp`;
          const qrCodeURL = await QRCode.toDataURL(otpauthUrl);
          qrCodeDataURL.value = qrCodeURL;

          console.log('Generated Secret Key:', generatedSecret.value);
        } catch (err) {
          console.error('Error generating secret key or QR code:', err);
        }
      } else {
        // Logic to handle disabling 2FA, if required
      }
    };

    const enableTwoFactorAuth = async () => {
    try {
        console.log('Entered Secret:', enteredSecret.value); // Log the entered secret
        const response = await AuthApiServices.PostRequest('/enable-2fa', {
            one_time_password: enteredSecret.value,
        });

        console.log('API Response:', response); // Log the response to check the structure

        if (response.message === "2-Factor Authentication successfully enabled.") {
            alert('2FA enabled successfully!');
            localStorage.setItem('twoFactorEnabled', 'true');
            isTwoFactorEnabled.value = true; // Update the state
            isEnabling2FA.value = false; // Close the enabling section
        }
    } catch (error) {
        console.error('Error enabling 2FA:', error);
        if (error.response) {
            console.error('Response data:', error.response.data); // Log the response data
            alert(error.response.data.errors?.google2fa_secret[0] || 'An error occurred'); // Handle specific error messages
        } else {
            alert('An unexpected error occurred. Please try again.'); // General error handling
        }
    }
};



    const disableTwoFactorAuth = async () => {
      try {
        const response = await AuthApiServices.PostRequest('/disable-2fa', {
          password: disablePassword.value,
        });

        if (response.data.message === '2-Factor Authentication successfully disabled.') {
          alert('2FA has been successfully disabled.');
          localStorage.setItem('twoFactorEnabled', 'false');
          isTwoFactorEnabled.value = false; // Update state
          isEnabling2FA.value = false; // Close section
        }
      } catch (error) {
        console.error('Error disabling 2FA:', error); // Log any errors
        if (error.response) {
          console.error('Response data:', error.response.data);
          alert(error.response.data.message || 'Failed to disable 2FA.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
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