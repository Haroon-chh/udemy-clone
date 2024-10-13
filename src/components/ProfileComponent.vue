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
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isDropdownOpen = ref(false);

    // Fetch user profile if logged in
    const fetchProfileIfLoggedIn = async () => {
      const isLoggedIn = store.getters.isLoggedIn;
      if (isLoggedIn) {
        await store.dispatch('fetchUserProfile'); // Dispatch the action to fetch the user profile
      }
    };

    onMounted(() => {
      fetchProfileIfLoggedIn(); // Fetch profile when the component is mounted
    });

    const userInitials = computed(() => {
      const loggedUser = store.getters.getLoggedUser;
      if (loggedUser && loggedUser.name) {
        return loggedUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
      }
      return '';
    });

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
    console.log('Dispatching logout action...'); // Log before dispatch
    const response = await store.dispatch('logoutUser'); // Dispatch the logout action

    // Show success or error message
    alert(response.message); // Show the response message in an alert

    // Redirect to login
    router.push('/login');
};


    return {
      isDropdownOpen,
      userInitials,
      toggleDropdown,
      goToProfile,
      goToChangePassword,
      logout,
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
  background-color:#2E2F31;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 2%;
}

.profile-dropdown {
  position: fixed !important; /* Changed from absolute to fixed */
  top: 13% !important; /* Adjust this value to match your header height */
  right: 1%; /* Align with the right side of the profile circle */
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px 0;
  min-width: 150px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
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