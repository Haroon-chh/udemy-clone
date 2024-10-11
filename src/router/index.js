import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import SignupView from '@/views/SignupView.vue';
import AboutUsView from '@/views/AboutUsView.vue';
import LoginView from '@/views/LoginView.vue';
import ContactUsView from '@/views/ContactUsView.vue';
import CartView from '@/views/CartView.vue';
import TeachUdemyView from '../views/TeachUdemyView.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard'},

  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { title: 'SignUp'},

  },
  {
    path: '/about',
    name: 'about',
    component: AboutUsView,
    meta: { title: 'About Us'},

  },
  {
    path: '/login',
    name: 'login',
    component: LoginView, // Add the Login route
    meta: { title: 'Login'},

  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUsView, // Add the Login route
    meta: { title: 'ContactUs'},

  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView, // Add the Cart route
    meta: { title: 'Cart'},

  },
  {
    path: '/teaching',
    name: 'teaching',
    component: TeachUdemyView, // Add the Cart route
    meta: { title: 'Teach with us'},

  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Udemy Clone';
  next();
});

export default router;
