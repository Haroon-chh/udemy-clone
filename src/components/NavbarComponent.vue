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
            <button class="btn p-0" type="button">
              <span class="material-icons">shopping_cart</span>
            </button>
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
                <li><a class="dropdown-item" href="#">Category 1</a></li>
                <li><a class="dropdown-item" href="#">Category 2</a></li>
                <li><a class="dropdown-item" href="#">Category 3</a></li>
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
              <a class="nav-link" href="#">
                Teach on Udemy
              </a>
              <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.teachDropdown }">
                <p>Turn what you know into an opportunity and reach millions around the world.</p>
                <button type="button" class="btn btn-dark rounded-0 fw-semibold">Learn More</button>
              </ul>
            </li>
  
            <!-- Cart Icon - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3" @mouseover="openDropdown('cartDropdown')" @mouseleave="closeDropdown('cartDropdown')">
              <a class="nav-link" href="#">
                <span class="material-icons">shopping_cart</span>
              </a>
              <ul class="dropdown-menu mt-3 px-4 py-2 wide-dropdown" :class="{ show: isOpen.cartDropdown }">
                <p>Your cart is empty</p>
                <p class=""><a class="text-decoration-none" style="font-size:small; color: purple;" href="#">Keep Shopping</a></p>
              </ul>
            </li>
  
            <!-- Login Button -->
            <li class="nav-item ms-3">
              <button class="btn btn-outline-secondary rounded-0 fw-semibold">Login</button>
            </li>
  
            <li class="nav-item ms-3">
              <button class="btn btn-dark rounded-0 fw-semibold">Sign Up</button>
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
      <div v-if="isLanguageModalOpen" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" @click="closeLanguageModal"></button>
            </div>
            <div class="modal-body text-center">
              <h5>Select Language</h5>
              <div class="row">
                <div class="col">
                  <p :class="{ 'text-primary fw-bold': selectedLanguage === 'English' }" @click="selectLanguage('English')">English</p>
                </div>
                <div class="col">
                  <p :class="{ 'text-primary fw-bold': selectedLanguage === 'Other' }" @click="selectLanguage('Other')">Other</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  
  const isOpen = reactive({
    categoriesDropdown: false,
  });
  
  function openDropdown(dropdown) {
    isOpen[dropdown] = true;
  }
  
  function closeDropdown(dropdown) {
    isOpen[dropdown] = false;
  }
  
  const isLanguageModalOpen = ref(false);
  const selectedLanguage = ref('English');
  
  function openLanguageModal() {
    isLanguageModalOpen.value = true;
  }
  
  function closeLanguageModal() {
    isLanguageModalOpen.value = false;
  }
  
  function selectLanguage(language) {
    selectedLanguage.value = language;
  }
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
  
  .input-group-text {
    background-color: transparent;
    border: none;
  }
  
  .input-group .form-control {
    border-color: black !important;
    height: 3em;
  }
  
  .btn-outline-secondary {
    color: #343a40;
    border-color: #343a40;
  }
  
  .btn-outline-secondary:hover {
    background-color: #343a40;
    color: #fff;
  }
  
  .btn-primary {
    background-color: #343a40;
    border-color: #343a40;
  }
  
  .btn-primary:hover {
    background-color: #50575e;
  }
  
  @media (max-width: 991px) {
    .navbar-collapse {
      text-align: left;
    }
  
    .navbar-nav {
      width: 100%;
    }
  }
  
  .modal-content {
    padding: 2rem;
  }
  
  .text-primary {
    color: blue !important;
  }
  
  .text-primary.fw-bold {
    font-weight: bold;
  }
  </style>
  