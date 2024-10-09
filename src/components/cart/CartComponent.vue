<template>
    <div class="container mt-5 mb-5">
      <h1 class="display-5 fw-bold">Shopping Cart</h1>
      <p class="mt-2 mb-4 text-muted">0 Courses in Cart</p>
      <div class="card p-5 text-center">
        <img src="@/assets/empty-shopping-cart-v2.png" class="img-fluid mb-4 mx-auto cart-image" alt="Empty Cart" />
        <p class="mb-4">Your cart is empty. Keep shopping to find a course!</p>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary btn-custom">Keep shopping</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartComponent'
  }
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #e6e6e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .btn-primary {
    background-color: #9b51e0;
    border-color: #9b51e0;
  }
  
  .btn-custom {
    max-width: 200px;
    width: 100%; 
  }
  .btn-custom:hover {
    background-color: #8710D8;
  }
  
 
  .cart-image {
    width: 100%;
    max-width: 240px;
    height: auto;
  }
  
  @media (max-width: 576px) {
    .card {
      padding: 2rem 1rem;
    }
    h1 {
      font-size: 1.75rem;
    }
  }
  </style>
  