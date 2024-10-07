<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
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
            <li class="nav-item dropdown " @mouseover="openDropdown('categoriesDropdown')" @mouseleave="closeDropdown('categoriesDropdown')">
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
          <form class="d-flex me-4 w-50 position-relative">
            <div class="input-group">
                <input class="form-control  rounded-5 ps-5 border" type="search" placeholder="Search for anything" aria-label="Search">
                <span class="input-group-text position-absolute" style="left: 10px; top: 50%; transform: translateY(-50%); background-color: transparent; border: none;">
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
                <p>Get your team access to over 27,000 top Udemy courses, anytime, anywhere.</p>
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
              <button class="btn btn-outline-secondary rounded-0 fw-semibold ">Login</button>
            </li>
  
            <!-- Signup Button -->
            <li class="nav-item ms-3 ">
              <button class="btn btn-dark rounded-0 fw-semibold">Sign Up</button>
            </li>
  
            <!-- World Icon Button - Dropdown on Hover -->
            <li class="nav-item dropdown ms-3">
              <button class="btn  rounded-0" @mouseover="openDropdown('worldDropdown')" @mouseleave="closeDropdown('worldDropdown')">
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
  .navbar{
    box-shadow: 0 5px 2px -2px rgba(57, 57, 57, 0.2);
    color: white;

  }
  .nab-item{
    vertical-align: baseline;
    justify-items: center;
  }
  .logo {
    width: 5em;
    display: inline;
  }
  .nav-link{
    font-size:90%;
    color:rgb(28, 28, 28);
  }
  
  .navbar-nav .dropdown-menu {
    display: none;
  }
  
  .navbar-nav .dropdown-menu.show {
    display: block;
    position: absolute;
    margin-top: 13%;
    border-radius: 0%;
    top:100%;
    padding: 10%;
    box-shadow: 2px 2px 2px  rgba(57, 57, 57, 0.2);
    font-weight: bold;

  }
  
  .input-group-text {
    background-color: transparent;
    border: none;
  }
  
  .input-group .form-control {
    border-color: black !important;
    height:3em;
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
  