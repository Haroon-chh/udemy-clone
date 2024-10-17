<template>
  <div class="container mt-5 mb-5">
    <h1 class="display-5 fw-bold">Shopping Cart</h1>
    <p class="mt-2 mb-4 text-muted">{{ cartItems.length }} Courses in Cart</p>

    <div v-if="cartItems.length === 0" class="card p-5 text-center">
      <img src="@/assets/empty-shopping-cart-v2.png" class="img-fluid mb-4 mx-auto cart-image" alt="Empty Cart" />
      <p class="mb-4">Your cart is empty. Keep shopping to find a course!</p>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary btn-custom" @click="keepShopping">Keep shopping</button>
      </div>
    </div>

    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="card mb-4 p-3">
        <div class="row">
          <div class="col-md-4">
            <img :src="item.image_url" alt="Course Image" class="img-fluid" />
          </div>
          <div class="col-md-8">
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
            <p><strong>Price:</strong> ${{ item.price }}</p>
            <button class="btn btn-danger" @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartComponent',
  computed: {
    cartItems() {
      return this.$store.getters.getCartItems;
    },
  },
  methods: {
    keepShopping() {
      this.$router.push('/'); // Redirect to the homepage or shopping page
    },
    removeFromCart(itemId) {
      this.$store.dispatch('removeCartItem', itemId); // Remove item from cart
      this.updateCartCount(); // Update cart count after removing
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const event = new Event('storage');
      localStorage.setItem('cart', JSON.stringify(cart)); // Trigger storage update
      window.dispatchEvent(event); // Dispatch the event to update navbar cart count
    },
  },
  mounted() {
    this.$store.dispatch('fetchCartItems'); // Fetch cart items from local storage
  },
};
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
