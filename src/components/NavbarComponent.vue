<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <!-- Logo Space -->
        <a class="navbar-brand" href="#"><img class="logo" src="../assets/udemy-logo.png" alt="logo"></a>
  
        <!-- Mobile View - Navbar Toggle & Cart Icon -->
        <div class="d-lg-none d-flex">
          <button class="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <button class="btn p-0 me-3" type="button">
            <span class="material-icons">search</span>
          </button>
          <button class="btn p-0" type="button">
            <span class="material-icons">shopping_cart</span>
          </button>
        </div>
  
        <!-- Desktop View - Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <!-- Categories Link - Dropdown -->
            <!-- Categories Link - Dropdown on Hover -->
            <li class="nav-item dropdown" @mouseover="openDropdown('categoriesDropdown')" @mouseleave="closeDropdown('categoriesDropdown')">
            <a class="nav-link" href="#" id="categoriesDropdown" role="button">
                Categories
            </a>
            <ul class="dropdown-menu" :class="{ show: isOpen.categoriesDropdown }">
                <li><a class="dropdown-item" href="#">Category 1</a></li>
                <li><a class="dropdown-item" href="#">Category 2</a></li>
                <li><a class="dropdown-item" href="#">Category 3</a></li>
            </ul>
            </li>

          </ul>
  
          <!-- Search Bar -->
          <form class="d-flex me-4 w-50">
            <div class="input-group">
              <input class="form-control border border-2 border-dark" type="search" placeholder="Search" aria-label="Search">
              <span class="input-group-text border border-2 border-dark">
                <span class="material-icons">search</span>
              </span>
            </div>
          </form>
  
          <!-- Right-side Links -->
          <ul class="navbar-nav">
            <!-- Udemy Business Link - Dropdown on Hover -->
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" @mouseover="openDropdown('businessDropdown')" @mouseleave="closeDropdown('businessDropdown')">
                Udemy Business
              </a>
              <ul class="dropdown-menu" :class="{ show: isOpen.businessDropdown }">
                <li><a class="dropdown-item" href="#">Business 1</a></li>
                <li><a class="dropdown-item" href="#">Business 2</a></li>
              </ul>
            </li>
  
            <!-- Teach on Udemy Link - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3">
              <a class="nav-link" href="#" @mouseover="openDropdown('teachDropdown')" @mouseleave="closeDropdown('teachDropdown')">
                Teach on Udemy
              </a>
              <ul class="dropdown-menu" :class="{ show: isOpen.teachDropdown }">
                <li><a class="dropdown-item" href="#">Teach Option 1</a></li>
                <li><a class="dropdown-item" href="#">Teach Option 2</a></li>
              </ul>
            </li>
  
            <!-- Cart Icon - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3">
              <a class="nav-link" href="#" @mouseover="openDropdown('cartDropdown')" @mouseleave="closeDropdown('cartDropdown')">
                <span class="material-icons">shopping_cart</span>
              </a>
              <ul class="dropdown-menu" :class="{ show: isOpen.cartDropdown }">
                <li><a class="dropdown-item" href="#">Item 1</a></li>
                <li><a class="dropdown-item" href="#">Item 2</a></li>
              </ul>
            </li>
  
            <!-- Login Button -->
            <li class="nav-item ms-3">
              <button class="btn btn-outline-secondary">Login</button>
            </li>
  
            <!-- Signup Button -->
            <li class="nav-item ms-3">
              <button class="btn btn-primary">Sign Up</button>
            </li>
  
            <!-- World Icon Button - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3">
              <button class="btn btn-outline-dark" @mouseover="openDropdown('worldDropdown')" @mouseleave="closeDropdown('worldDropdown')">
                <span class="material-icons">public</span>
              </button>
              <ul class="dropdown-menu" :class="{ show: isOpen.worldDropdown }">
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
  .logo {
    width: 4em;
    display: inline;
  }
  
  .navbar-nav .dropdown-menu {
    display: none;
  }
  
  .navbar-nav .dropdown-menu.show {
    display: block;
  }
  
  .input-group-text {
    background-color: transparent;
    border: none;
  }
  
  .input-group .form-control {
    border-width: 2px !important;
    border-color: black !important;
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
  </style>
  