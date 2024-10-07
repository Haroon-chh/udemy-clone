<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Logo Space -->
        <a class="navbar-brand" href="#">Logo</a>
  
        <!-- Mobile View - Search & Cart Icon -->
        <div class="d-lg-none d-flex">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown">
                Categories
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Category 1</a></li>
                <li><a class="dropdown-item" href="#">Category 2</a></li>
                <li><a class="dropdown-item" href="#">Category 3</a></li>
              </ul>
            </li>
            
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
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" @mouseover="openDropdown('teachDropdown')" @mouseleave="closeDropdown('teachDropdown')">
                Teach on Udemy
              </a>
              <ul class="dropdown-menu" :class="{ show: isOpen.teachDropdown }">
                <li><a class="dropdown-item" href="#">Teach Option 1</a></li>
                <li><a class="dropdown-item" href="#">Teach Option 2</a></li>
              </ul>
            </li>
          </ul>
  
          <!-- Search Bar -->
          <form class="d-flex me-4 d-none d-lg-flex">
            <input class="form-control" type="search" placeholder="Search">
            <span class="material-icons ms-2">search</span>
          </form>
  
          <!-- Right-side Links -->
          <ul class="navbar-nav">
            <!-- Cart Icon - Dropdown on Hover -->
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" @mouseover="openDropdown('cartDropdown')" @mouseleave="closeDropdown('cartDropdown')">
                <span class="material-icons">shopping_cart</span>
              </a>
              <ul class="dropdown-menu" :class="{ show: isOpen.cartDropdown }">
                <li><a class="dropdown-item" href="#">Item 1</a></li>
                <li><a class="dropdown-item" href="#">Item 2</a></li>
              </ul>
            </li>
  
            <!-- Login Button -->
            <li class="nav-item">
              <button class="btn btn-outline-dark me-2">Login</button>
            </li>
  
            <!-- Signup Button -->
            <li class="nav-item">
              <button class="btn btn-dark">Sign Up</button>
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
  .navbar-nav .dropdown-menu {
    display: none;
  }
  
  .navbar-nav .dropdown-menu.show {
    display: block;
  }
  
  .nav-item button {
    border: none;
    background: none;
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
  