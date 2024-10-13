<template>
  <div class="profile-container">
    <button @click="toggleDropdown" class="profile-circle" type="button" id="profileDropdown">
      {{ userInitials }}
    </button>
    <div v-if="isDropdownOpen" class="profile-dropdown">
      <a href="#" @click.prevent="goToProfile">Profile</a>
      <a href="#" @click.prevent="goToChangePassword">Change Password</a>
      <button @click="logout" class="btn btn-outline-danger btn-sm ms-2">Logout</button>
    </div>

    <!-- Success and Error Popups -->
    <SuccessPopup :show="showSuccessPopup" :message="successMessage" />
    <ErrorPopup :show="showErrorPopup" :message="errorMessage" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import SuccessPopup from '../components/SuccessPopup.vue';
import ErrorPopup from '../components/ErrorPopup.vue';

export default {
  name: 'ProfileComponent',
  components: {
    SuccessPopup,
    ErrorPopup,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isDropdownOpen = ref(false);

    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const userInitials = computed(() => {
      const loggedUser = store.getters.getLoggedUser;
      return (
        loggedUser?.name
          ?.split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase() || ''
      );
    });

    const fetchProfileIfLoggedIn = async () => {
      if (store.getters.isLoggedIn) {
        await store.dispatch('fetchUserProfile');
      }
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const goToProfile = () => {
      router.push('/profile');
      isDropdownOpen.value = false;
    };

    const goToChangePassword = () => {
      router.push('/change-password');
      isDropdownOpen.value = false;
    };

    const logout = async () => {
      try {
        const response = await store.dispatch('logoutUser');
        console.log('Logout response:', response);

        // Show success message and popup
        successMessage.value = 'Logout successful! Redirecting to login...';
        showSuccessPopup.value = true;

        setTimeout(() => {
          showSuccessPopup.value = false;
          router.push('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Error during logout:', error);

        // Show error message and popup
        errorMessage.value = error.message || 'Logout failed. Please try again.';
        showErrorPopup.value = true;

        setTimeout(() => {
          showErrorPopup.value = false;
        }, 5000);
      }
    };

    onMounted(() => fetchProfileIfLoggedIn());

    return {
      isDropdownOpen,
      userInitials,
      toggleDropdown,
      goToProfile,
      goToChangePassword,
      logout,
      showSuccessPopup,
      successMessage,
      showErrorPopup,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.profile-container {
  position: relative !important;
  margin-right: 2%;
}
.profile-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background-color: #2e2f31;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 2%;
}
.profile-dropdown {
  position: fixed !important;
  top: 13% !important;
  right: 1%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 0;
  min-width: 150px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.profile-dropdown a {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
}
.profile-dropdown a:hover {
  background-color: #f8f9fa;
}
@media (max-width: 768px) {
  .profile-container {
    margin-right: 10px;
  }
  .profile-circle {
    width: 40px;
    height: 40px;
    font-size: 0.9em;
  }
  .profile-dropdown {
    right: 5%;
    min-width: 120px;
  }
  .profile-dropdown a {
    padding: 6px 12px;
    font-size: 0.9em;
  }
}
@media (max-width: 480px) {
  .profile-container {
    margin-right: 5px;
  }
  .profile-circle {
    width: 35px;
    height: 35px;
    font-size: 0.8em;
  }
  .profile-dropdown {
    right: 2%;
    min-width: 100px;
  }
  .profile-dropdown a {
    padding: 4px 8px;
    font-size: 0.8em;
  }
}
</style>
