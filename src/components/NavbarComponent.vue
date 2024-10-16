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
          <img class="logo-mobile" src="../assets/udemy-logo.png" alt="logo" />
        </a>

        <!-- Cart and Search Icons -->
        <div class="d-flex">
          <button class="btn p-0 me-3" type="button">
            <span class="material-icons">search</span>
          </button>
          <!-- Cart Button that triggers navigation to the cart page -->
          <button class="btn p-0 position-relative" type="button" @click="handleCartAccess">
            <span class="material-icons">shopping_cart</span>
            <span v-if="cartCount > 0" class="badge-cart">{{ cartCount }}</span>
          </button>
        </div>
      </div>

      <!-- Desktop Logo (Left side) -->
      <a class="navbar-brand d-none d-lg-block" href="#">
        <img class="logo" src="../assets/udemy-logo.png" alt="logo" />
      </a>

      <!-- Desktop & Tablet View - Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- Categories Link - Dropdown on Hover -->
          <li class="nav-item dropdown" @mouseover="openDropdown('categoriesDropdown')" @mouseleave="closeDropdown('categoriesDropdown')">
            <a class="nav-link" href="#" id="categoriesDropdown" role="button">Categories</a>
            <ul class="dropdown-menu mt-4" :class="{ show: isOpen.categoriesDropdown }">
              <!-- Main Categories -->
              <!-- ... other categories ... -->
            </ul>
          </li>
        </ul>

        <!-- Search Bar -->
        <form class="d-flex me-4 w-50 position-relative">
          <div class="input-group">
            <input class="form-control rounded-5 ps-5 border" type="search" placeholder="Search for anything" aria-label="Search" />
            <span class="input-group-text position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%); background-color: transparent; border: none;">
              <span class="material-icons">search</span>
            </span>
          </div>
        </form>

        <!-- Right-side Links -->
        <ul class="navbar-nav">
          <!-- Udemy Business Link - Dropdown on Hover -->
          <li class="nav-item dropdown" @mouseover="openDropdown('businessDropdown')" @mouseleave="closeDropdown('businessDropdown')">
            <a class="nav-link" href="#">Udemy Business</a>
            <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.businessDropdown }">
              <p>Get your team access to over 27,000 top Udemy courses, anytime, anywhere.</p>
              <button type="button" class="btn btn-dark rounded-0 fw-semibold">Try Udemy Business</button>
            </ul>
          </li>

          <!-- Teach on Udemy Link - Dropdown on Hover -->
          <li class="nav-item dropdown ms-3" @mouseover="openDropdown('teachDropdown')" @mouseleave="closeDropdown('teachDropdown')">
            <a class="nav-link">Teach on Udemy</a>
            <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.teachDropdown }">
              <p>Turn what you know into an opportunity and reach millions around the world.</p>
              <router-link to="/teaching" class="btn btn-dark rounded-0 fw-semibold" role="button">Learn More</router-link>
            </ul>
          </li>

          <!-- Cart Icon - Dropdown on Hover -->
          <li class="nav-item dropdown ms-3" @mouseover="openDropdown('cartDropdown')" @mouseleave="closeDropdown('cartDropdown')">
            <a class="nav-link position-relative" href="#" @click="handleCartAccess">
              <span class="material-icons">shopping_cart</span>
              <span v-if="cartCount > 0" class="badge-cart">{{ cartCount }}</span>
            </a>
            <ul class="dropdown-menu mt-3 px-4 py-2" :class="{ show: isOpen.cartDropdown }">
              <div v-if="cartCount > 0">
                <p>{{ cartCount }} items in your cart</p>
              </div>
              <div v-else>
                <p>No items in your cart</p>
              </div>
            </ul>
          </li>

          <!-- Check for logged in state -->
          <li v-if="isLoggedIn" class="nav-item ms-4">
            <ProfileComponent />
          </li>
          <li v-if="!isLoggedIn" class="nav-item ms-3">
            <router-link to="/login" class="btn btn-outline-secondary rounded-0 fw-semibold">Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item ms-3">
            <router-link to="/signup" class="btn btn-dark rounded-0 fw-semibold">Sign Up</router-link>
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

    <!-- Error Popup for unauthorized access -->
    <ErrorPopup v-if="showErrorPopup" :show="showErrorPopup" message="You need to be logged in to view your cart!" />

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
import ErrorPopup from '@/components/ErrorPopup.vue'; // ErrorPopup for unauthorized access

export default {
  name: 'NavbarComponent',
  components: {
    ProfileComponent,
    ErrorPopup,
  },
  data() {
    return {
      cartCount: 0, // Track number of items in the cart
      showErrorPopup: false, // To control the visibility of the error popup
    };
  },
  computed: {
    ...mapGetters(['getLanguageModalState']),
    isLoggedIn() {
      const user = JSON.parse(localStorage.getItem('authUser')); // Checking for logged-in user
      return user && user.access_token;
    },
    isOpen() {
      return this.$store.state.isOpen;
    },
  },
  methods: {
    ...mapActions(['openDropdown', 'closeDropdown', 'openLanguageModal', 'closeLanguageModal']),

    toggleDropdown(dropdown) {
      const isOpen = this.isOpen[dropdown];
      if (isOpen) {
        this.closeDropdown(dropdown);
      } else {
        this.openDropdown(dropdown);
      }
    },
    handleCartAccess() {
      const user = JSON.parse(localStorage.getItem('authUser')); // Check if user is logged in
      if (user && user.access_token) {
        this.$router.push('/cart');
      } else {
        this.showErrorPopup = true;
        setTimeout(() => {
          this.showErrorPopup = false;
        }, 3000); // Hide error popup after 3 seconds
      }
    },
    loadCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartCount = cart.length;
    },
  },
  mounted() {
    this.loadCart(); // Update cart count on component mount
    window.addEventListener('storage', this.loadCart); // Listen for storage changes
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.loadCart);
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

.badge-cart {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%; /* Ensures the badge is circular */
  width: 24px; /* Adjust this to control the size of the circle */
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  padding: 0;
  line-height: 1;
  text-align: center;
}

</style>
