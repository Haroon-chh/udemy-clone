<template>
  <div class="profile-container" @mouseover="openDropdown" @mouseleave="closeDropdown">
    <button class="profile-circle" type="button" id="profileDropdown">
      {{ userInitials }}
    </button>
    <div v-if="isDropdownOpen" class="profile-dropdown">
      <h6 class="profile-name text-center">{{ userName }}</h6>
      <hr />
      <router-link to="/edit-profile" class="dropdown-link">Edit Profile</router-link>
      <router-link to="/subscriptions" class="dropdown-link">Subscriptions</router-link>
      <router-link to="/purchase-courses" class="dropdown-link">Purchase Courses</router-link>

      <hr />
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
import SuccessPopup from '../SuccessPopup.vue';
import ErrorPopup from '../ErrorPopup.vue';

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

    const userName = computed(() => {
      return store.getters.getLoggedUser?.name || 'User';
    });

    const fetchProfileIfLoggedIn = async () => {
      if (store.getters.isLoggedIn) {
        await store.dispatch('fetchUserProfile');
      }
    };

    const openDropdown = () => {
      isDropdownOpen.value = true;
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };

    const goToProfile = () => {
      router.push('/profile');
      closeDropdown();
    };

    const logout = async () => {
      try {
        const response = await store.dispatch('logoutUser');
        console.log('Logout response:', response);

        if (response.success) {
          successMessage.value = response.message || 'Logout successful! Redirecting to login...';
          showSuccessPopup.value = true;

          setTimeout(() => {
            showSuccessPopup.value = false;
            router.push('/login');
          }, 2000);
        } else {
          errorMessage.value = response.message || 'Logout failed. Please try again.';
          showErrorPopup.value = true;

          setTimeout(() => {
            showErrorPopup.value = false;
          }, 5000);
        }
      } catch (error) {
        console.error('Error during logout:', error);
        errorMessage.value = error.message || 'An error occurred. Please try again.';
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
      userName,
      openDropdown,
      closeDropdown,
      goToProfile,
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
  position: relative;
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
  transition: background-color 0.3s;
}

.profile-circle:hover {
  background-color: #444;
}

.profile-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 0;
  min-width: 180px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.profile-name {
  font-weight: bold;
}

.dropdown-link {
  display: block;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-link:hover {
  background-color: #f8f9fa;
}

hr {
  margin: 8px 0;
}

@media (max-width: 768px) {
  .profile-circle {
    width: 40px;
    height: 40px;
    font-size: 0.9em;
  }

  .profile-dropdown {
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  .profile-circle {
    width: 35px;
    height: 35px;
    font-size: 0.8em;
  }

  .profile-dropdown {
    min-width: 120px;
  }
}
</style>
