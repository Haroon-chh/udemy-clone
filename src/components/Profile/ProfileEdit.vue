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
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ProfileEdit',
    setup() {
      const store = useStore();
      const user = computed(() => store.getters.getLoggedUser);
      const username = ref('');
  
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
  
      return {
        username,
        userInitials,
        userName,
        userEmail,
        saveProfile,
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
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type='text'] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s;
  }
  
  input[type='text']:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .btn-primary {
    width: 50%;
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
  
  .btn-primary:hover {
    background-color: #9530d7;
  }
  
  .change-password-section {
    background-color: #e9ecef;
    padding: 15px;
    border-radius: 8px;
    margin-top: 30px;
    text-align: center;
  }
  
  .change-password-section h5 {
    margin: 0 0 10px;
    font-weight: bold;
  }
  
  .btn-link {
    display: inline-block;
    padding: 10px 20px;
    background-color: #2a2a2a;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .btn-link:hover {
    background-color:#2a2a2a;
    color:#ccc;
  }
  </style>
  