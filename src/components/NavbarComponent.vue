<template>
    <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        
        <!-- Desktop Logo (Left side) -->
        <a class="navbar-brand d-none d-lg-block" href="#">
          <img class="logo" src="../assets/udemy-logo.png" alt="logo">
        </a>
  
        <!-- Mobile Logo (Centered) -->
        <a class="navbar-brand d-lg-none mx-auto d-inline" href="#">
          <img class="logo-mobile" src="../assets/udemy-logo.png" alt="logo">
        </a>
  
        <!-- Mobile View - Navbar Toggle & Icons -->
        <div class="d-lg-none d-flex align-items-center justify-content-end w-100">
          <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div>
            <button class="btn p-0 me-3" type="button">
              <span class="material-icons">search</span>
            </button>
            <button class="btn p-0" type="button">
              <span class="material-icons">shopping_cart</span>
            </button>
          </div>
        </div>
  
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
  
            <!-- Signup Button -->
            <li class="nav-item ms-3">
              <button class="btn btn-dark rounded-0 fw-semibold">Sign Up</button>
            </li>
  
            <!-- World Icon Button - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3" @mouseover="openDropdown('worldDropdown')" @mouseleave="closeDropdown('worldDropdown')">
              <button class="btn rounded-0">
                <span class="material-icons">public</span>
              </button>
              <ul class="dropdown-menu wide-dropdown" :class="{ show: isOpen.worldDropdown }">
                <li><a class="dropdown-item" href="#">Language 1</a></li>
                <li><a class="dropdown-item" href="#">Language 2</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  
  const isOpen = reactive({
    categoriesDropdown: false,
    businessDropdown: false,
    teachDropdown: false,
    cartDropdown: false,
    worldDropdown: false,
  });
  
  function openDropdown(dropdown) {
    isOpen[dropdown] = true;
  }
  
  function closeDropdown(dropdown) {
    isOpen[dropdown] = false;
  }
  </script>
  
  <style scoped>
  .navbar {
    box-shadow: 0 5px 2px -2px rgba(57, 57, 57, 0.2);
    background-color: white;
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
  
  .nav-link:hover, .nav-link:focus, .dropdown-item:hover {
    color: purple !important;
  }
  
  @media (max-width: 991px) {
    .navbar-collapse {
      text-align: left;
    }
  
    .navbar-nav {
      width: 100%;
    }
  }
  </style>
  