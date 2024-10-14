<template>
    <div class="change-password-container">
      <div class="profile-header">
        <button class="profile-circle">{{ userInitials }}</button>
        <h3 class="profile-name">{{ userName }}</h3>
        <p class="profile-email">
          <span class="material-icons">lock</span>
          {{ userEmail }}
        </p>
      </div>
  
      <form @submit.prevent="changePassword" class="password-form">
        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input type="password" id="currentPassword" v-model="currentPassword" required />
        </div>
  
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input type="password" id="newPassword" v-model="newPassword" required />
        </div>
  
        <div class="form-group">
          <label for="confirmNewPassword">Confirm New Password</label>
          <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" required />
        </div>
  
        <button type="submit" class="btn btn-primary">Confirm</button>
      </form>
  
      <div class="change-password-link">
        <router-link to="/edit-profile">Back to Profile</router-link>
      </div>
  
      <SuccessPopup :show="showSuccessPopup" :message="successMessage" />
      <ErrorPopup :show="showErrorPopup" :message="errorMessage" />
    </div>
  </template>
  
  <script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import SuccessPopup from '../SuccessPopup.vue';
import ErrorPopup from '../ErrorPopup.vue';

export default {
  name: 'ChangePassword',
  components: {
    SuccessPopup,
    ErrorPopup,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getLoggedUser);

    const currentPassword = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');

    const userInitials = computed(() => {
      return user.value?.name
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || '';
    });

    const userName = computed(() => user.value?.name || 'User');
    const userEmail = computed(() => user.value?.email || 'user@example.com');

    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const changePassword = async () => {
      if (newPassword.value !== confirmNewPassword.value) {
        errorMessage.value = 'New password and confirm password do not match.';
        showErrorPopup.value = true;
        return;
      }

      try {
        const response = await store.dispatch('changePassword', {
          current_password: currentPassword.value,
          new_password: newPassword.value,
          new_password_confirmation: confirmNewPassword.value,
        });

        if (response.success) {
          successMessage.value = response.message || 'Password changed successfully!';
          showSuccessPopup.value = true;

          setTimeout(() => {
            showSuccessPopup.value = false;
          }, 2000);
        } else {
          errorMessage.value = response.message || 'Failed to change password.';
          showErrorPopup.value = true;

          setTimeout(() => {
            showErrorPopup.value = false;
          }, 5000);
        }
      } catch (error) {
        console.error('Error during password change:', error);
        errorMessage.value = error.message || 'An error occurred. Please try again.';
        showErrorPopup.value = true;

        setTimeout(() => {
          showErrorPopup.value = false;
        }, 5000);
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmNewPassword,
      userInitials,
      userName,
      userEmail,
      changePassword,
      showSuccessPopup,
      showErrorPopup,
      successMessage,
      errorMessage,
    };
  },
};
</script>
  
  <style scoped>
  .change-password-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .profile-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #2e2f31;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5em;
  }
  
  .profile-name {
    margin-top: 10px;
    font-weight: bold;
  }
  .btn-primary {
    width: 20%;
    background-color:#A435F0;
    border: none;
    padding: 12px;
    color: white;
    font-weight: bold;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .btn:hover{
    background-color: #912fd2;
  }
  
  .profile-email {
    font-size: 0.9em;
    color: gray;
  }
  
  .profile-email .material-icons {
    vertical-align: middle;
    margin-right: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type='password'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    background-color: blueviolet;
    border-color: none;
  }
  
  .change-password-link {
    margin-top: 20px;
    text-align: center;
  }
  </style>
  