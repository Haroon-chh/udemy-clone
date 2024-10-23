<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- Mobile View - Navbar Toggle, Logo, Icons -->
      <div class="d-lg-none d-flex align-items-center justify-content-between w-100">
        <!-- Navbar Toggle -->
        <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Mobile Logo (Centered) -->
        <a class="navbar-brand mx-auto" href="#">
          <img class="logo-mobile" src="../assets/udemy-logo.png" alt="logo">
        </a>

        <!-- Cart and Search Icons -->
        <div class="d-flex">
          <button class="btn p-0 me-3" type="button">
            <span class="material-icons">search</span>
          </button>
          <router-link to="/cart">
          <button class="btn p-0" type="button">
            <span class="material-icons">shopping_cart</span>
          </button>
        </router-link>
        </div>
      </div>

      <!-- Desktop Logo (Left side) -->
      <a class="navbar-brand d-none d-lg-block" href="#">
        <img class="logo" src="../assets/udemy-logo.png" alt="logo">
      </a>

      <!-- Desktop & Tablet View - Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- Categories Link - Dropdown on Hover -->
          <li class="nav-item dropdown" @mouseover="openDropdown('categoriesDropdown')" @mouseleave="closeDropdown('categoriesDropdown')">
            <a class="nav-link" href="#" id="categoriesDropdown" role="button">
              Categories
            </a>
            <ul class="dropdown-menu mt-4" :class="{ show: isOpen.categoriesDropdown }">
              <!-- Main Categories -->
              <li class="dropdown-submenu" @mouseover="openDropdown('developmentDropdown')" @mouseleave="closeDropdown('developmentDropdown')">
                <a class="dropdown-item" href="#">Development</a>
                <!-- Subcategories -->
                <ul class="dropdown-menu mt-4 ms-4" :class="{ show: isOpen.developmentDropdown }">
                  <li class="dropdown-submenu" @mouseover="openDropdown('webDevDropdown')" @mouseleave="closeDropdown('webDevDropdown')">
                    <a class="dropdown-item" href="#">Web Development</a>
                    <!-- Nested Subcategories -->
                    <ul class="dropdown-menu mt-4 ms-4" :class="{ show: isOpen.webDevDropdown }">
                      <li><a class="dropdown-item" href="#">HTML</a></li>
                      <li><a class="dropdown-item" href="#">CSS</a></li>
                      <li><a class="dropdown-item" href="#">JavaScript</a></li>
                      <li><a class="dropdown-item" href="#">React</a></li>
                      <li><a class="dropdown-item" href="#">Vue.js</a></li>
                      <li><a class="dropdown-item" href="#">Angular</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu" @mouseover="openDropdown('mobileDevDropdown')" @mouseleave="closeDropdown('mobileDevDropdown')">
                    <a class="dropdown-item" href="#">Mobile Development</a>
                    <!-- Mobile Development Nested Subcategories -->
                    <ul class="dropdown-menu mt-4 ms-4" :class="{ show: isOpen.mobileDevDropdown }">
                      <li><a class="dropdown-item" href="#">iOS Development</a></li>
                      <li><a class="dropdown-item" href="#">Android Development</a></li>
                      <li><a class="dropdown-item" href="#">Flutter</a></li>
                      <li><a class="dropdown-item" href="#">React Native</a></li>
                    </ul>
                  </li>
                  <li><a class="dropdown-item" href="#">Data Science</a></li>
                  <li><a class="dropdown-item" href="#">Machine Learning</a></li>
                  <li><a class="dropdown-item" href="#">Artificial Intelligence</a></li>
                  <li><a class="dropdown-item" href="#">Game Development</a></li>
                  <li><a class="dropdown-item" href="#">Software Engineering</a></li>
                </ul>
              </li>
              <li class="dropdown-submenu" @mouseover="openDropdown('businessDropdown')" @mouseleave="closeDropdown('businessDropdown')">
                <a class="dropdown-item" href="#">Business</a>
                <!-- Subcategories for Business -->
                <ul class="dropdown-menu mt-4 ms-4" :class="{ show: isOpen.businessDropdown }">
                  <li><a class="dropdown-item" href="#">Entrepreneurship</a></li>
                  <li><a class="dropdown-item" href="#">Communication</a></li>
                  <li><a class="dropdown-item" href="#">Management</a></li>
                  <li><a class="dropdown-item" href="#">Sales</a></li>
                  <li><a class="dropdown-item" href="#">Marketing</a></li>
                  <li><a class="dropdown-item" href="#">Finance</a></li>
                  <li><a class="dropdown-item" href="#">Business Analytics</a></li>
                </ul>
              </li>
              <li><a class="dropdown-item" href="#">IT & Software</a></li>
              <li><a class="dropdown-item" href="#">Design</a></li>
              <li><a class="dropdown-item" href="#">Personal Development</a></li>
              <li><a class="dropdown-item" href="#">Health & Fitness</a></li>
            </ul>
          </li>
        </ul>

        <!-- Search Bar -->
        <form class="d-flex me-4 w-50 position-relative">
          <div class="input-group">
            <input class="form-control rounded-5 ps-5 border" type="search" placeholder="Search for anything" aria-label="Search">
            <span class="input-group-text position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%); background-color: transparent; border: none;">
              <span class="material-icons">search</span>
            </span>
          </div>
        </form>

        <!-- Right-side Links -->
        <ul class="navbar-nav">
          <!-- Udemy Business Link - Dropdown on Hover -->
          <li class="nav-item dropdown" @mouseover="openDropdown('businessDropdown')" @mouseleave="closeDropdown('businessDropdown')">
            <a class="nav-link" href="#">
              Udemy Business
            </a>
            <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.businessDropdown }">
              <p>Get your team access to over 27,000 top Udemy courses, anytime, anywhere.</p>
              <button type="button" class="btn btn-dark rounded-0 fw-semibold">Try Udemy Business</button>
            </ul>
          </li>

          <!-- Teach on Udemy Link - Dropdown on Hover -->
          <li class="nav-item dropdown ms-3" @mouseover="openDropdown('teachDropdown')" @mouseleave="closeDropdown('teachDropdown')">
            <a class="nav-link">
              Teach on Udemy
            </a>
            <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.teachDropdown }">
              <p>Turn what you know into an opportunity and reach millions around the world.</p>
              <router-link to="/teaching" class="btn btn-dark rounded-0 fw-semibold" role="button">
              Learn More
              </router-link>
            </ul>
          </li>

          <!-- Cart Icon - Dropdown on Hover -->
          <li class="nav-item ms-3 mt-2">
            <router-link to="/cart">
              <button class="btn p-0" type="button">
                <span class="material-icons">shopping_cart</span>
              </button>
            </router-link>
          </li>

                <!-- Check for logged in state from Vuex -->
          <li v-if="isLoggedIn" class="nav-item ms-4">
            <ProfileComponent />
          </li>
          <li v-if="!isLoggedIn" class="nav-item ms-3">
            <router-link to="/login" class="btn btn-outline-secondary rounded-0 fw-semibold">
              Login
            </router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item ms-3">
            <router-link to="/signup" class="btn btn-dark rounded-0 fw-semibold">
              Sign Up
            </router-link>
          </li>


          <!-- World Icon Button -->
          <li class="nav-item ms-3">
            <button class="btn rounded-0" @click="openLanguageModal">
              <span class="material-icons">public</span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Language Modal -->
<div v-if="getLanguageModalState" class="modal fade show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Select Language</h5>
        <button type="button" class="btn-close" @click="closeLanguageModal"></button>
      </div>
      <div class="modal-body">
        <ul>
          <li><a href="#">English</a></li>
          <li><a href="#">Español</a></li>
          <li><a href="#">Français</a></li>
          <li><a href="#">Deutsch</a></li>
          <li><a href="#">Português</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>

  </nav>
</template>




  
<script>
import { mapActions, mapGetters } from 'vuex';
import ProfileComponent from './Profile/ProfileComponent.vue';

export default {
  name: 'NavbarComponent',
  components: {
    ProfileComponent,
  },
  computed: {
  // Use Vuex getters to check if user is logged in and get language modal state
  ...mapGetters(['getLanguageModalState']),

  // Directly access the isLoggedIn getter and rename it for clarity
  isLoggedIn() {
    return this.$store.getters.isLoggedIn; // Use Vuex getter for loggedIn status
  },

  // Access the isOpen state directly from the Vuex store
  isOpen() {
    return this.$store.state.isOpen;
  },
},
  methods: {
    ...mapActions(['openDropdown', 'closeDropdown', 'openLanguageModal', 'closeLanguageModal']),
    toggleDropdown(dropdown) {
      const isOpen = this.isOpen[dropdown]; // Access the dropdown state correctly
      if (isOpen) {
        this.closeDropdown(dropdown);
      } else {
        this.openDropdown(dropdown);
      }
    },
    toggleLanguageModal() {
      if (this.isLanguageModalOpen) {
        this.closeLanguageModal();
      } else {
        this.openLanguageModal();
      }
    }
  },
};
</script>



  
  <style scoped>
.navbar {
  box-shadow: 0 5px 2px -2px rgba(57, 57, 57, 0.2);
  background-color: white;
  width: 100vw;
}

.logo {
  width: 5em;
}

.logo-mobile {
  width: 4em;
}

.nav-link {
  font-size: 90%;
  color: rgb(28, 28, 28);
}

.navbar-nav .dropdown-menu {
  display: none;
}

.navbar-nav .dropdown-menu.show {
  display: block;
  position: absolute;
  margin-top: 13%;
  border-radius: 0%;
  top: 100%;
  padding: 10%;
  box-shadow: 2px 2px 2px rgba(57, 57, 57, 0.2);
  font-weight: bold;
}

.navbar-nav .dropdown-menu.wide-dropdown {
  width: 250px;
  padding: auto;
}

.navbar-nav .dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-left: 0;
}

.navbar-nav .dropdown-submenu {
  position: relative;
}

.navbar-nav .dropdown-submenu .dropdown-menu.show {
  display: block;
  position: absolute;
  left: 100%;
  top: 0;
}
</style>