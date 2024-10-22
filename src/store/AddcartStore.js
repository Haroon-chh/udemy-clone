import AuthApiServices from '@/services/AuthApiServices';

export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [], // Initialize cart from local storage
  },
  getters: {
    getCartItems: (state) => state.cart,
  },
  mutations: {
    setCart(state, cartItems) {
      state.cart = cartItems;
      localStorage.setItem('cart', JSON.stringify(cartItems)); // Store cart in local storage
    },
    addToCart(state, item) {
      state.cart.push(item);
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Update local storage
    },
    removeItemFromCart(state, itemId) {
      state.cart = state.cart.filter((item) => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Update local storage
    },
  },
  actions: {
    fetchCartItems({ commit }) {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      commit('setCart', cartItems); // Load cart items from local storage
    },
    addCartItem({ commit }, item) {
      commit('addToCart', item); // Add new item to the cart
    },
    removeCartItem({ commit }, itemId) {
      commit('removeItemFromCart', itemId); // Remove item from cart
    },
    async purchaseCartItems(_, cartItems) {
      try {
        const response = await AuthApiServices.PostRequest('/purchase', {
          courses: cartItems, // Send the cart items to the purchase endpoint
        });
        console.log('Purchase API response:', response);
        return { success: true, data: response }; // Return success response
      } catch (error) {
        console.error('Error during purchase:', error);
        return { success: false, message: error.message }; // Return failure response
      }
    },
  },
};
