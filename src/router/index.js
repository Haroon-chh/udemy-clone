import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import SignupView from '@/views/SignupView.vue';
import AboutUsView from '@/views/AboutUsView.vue';
import LoginView from '@/views/LoginView.vue';
import ContactUsView from '@/views/ContactUsView.vue';
import CartView from '@/views/CartView.vue';
import TeachUdemyView from '../views/TeachUdemyView.vue';
import CourseDetailsView from '../views/CourseDetailsView.vue';
import EditProfile from '../views/EditProfile.vue';
import ChangePassword from '@/components/Profile/ChangePassword.vue';
import AddArticle from '@/components/dashboard/Admin/AddArticle.vue';
import ViewArticles from '@/components/dashboard/Admin/ViewArticles.vue';  

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard' },
    children: [
      {
        path: 'add-article',
        name: 'add-article',
        component: AddArticle,
        meta: { title: 'Add Article' },
      },
      {
        path: 'view-articles',
        name: 'view-articles',
        component: ViewArticles,
        meta: { title: 'View Articles' },
      },
    ],
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { title: 'SignUp' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUsView,
    meta: { title: 'About Us' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' },
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUsView,
    meta: { title: 'Contact Us' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { title: 'Cart' },
  },
  {
    path: '/teaching',
    name: 'teaching',
    component: TeachUdemyView,
    meta: { title: 'Teach with us' },
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
    meta: { title: 'Edit Profile' },
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword,
    meta: { title: 'Change Password' },
  },
  {
    path: '/course/:slug',
    name: 'CourseDetails',
    component: CourseDetailsView,
    meta: { title: 'Course Details' },
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
