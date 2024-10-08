import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

// src/store.js
// src/store/index.js
// src/store/index.js
// src/store/index.js
// import { createStore } from 'vuex';

// const store = createStore({
//   state: {
//     items: [
//       { id: 1, image: 'https://via.placeholder.com/800x400', title: 'Slide 1' },
//       { id: 2, image: 'https://via.placeholder.com/800x400', title: 'Slide 2' },
//       { id: 3, image: 'https://via.placeholder.com/800x400', title: 'Slide 3' },
//     ],
//   },
//   getters: {
//     getItems: (state) => state.items,
//   },
// });

// export default store;
