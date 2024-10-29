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
import PageSettingView from '../views/PageSettingView.vue';
import ViewArticles from '@/components/dashboard/Admin/ViewArticles.vue';  
import QuillEditorComponent from '@/components/dashboard/Admin/QuillEditorComponent.vue';
import SubscriptionView from '@/views/SubscriptionView.vue'; // Import Subscription View
import ActiveSubscription from '@/components/dashboard/Admin/ActiveSubscription.vue';
import SiteSettings from '@/components/dashboard/Admin/SiteSettings.vue';
import PurchaseCourses from '@/components/Profile/PurchaseCourses.vue';
import PurchaseCourseDetailView from '../views/PurchaseCourseDetailView.vue';
import ArticleDetailsView from '@/views/ArticleDetailsView.vue';
import RouteGuard from '@/services/RouteGuard';  // Import the route guard


const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard' },  //public
    children: [
      {
        path: 'add-article',
        name: 'add-article',
        component: AddArticle,
        meta: { title: 'Add Article', roles: ['admin'] },  //admin
      },
      {
        path: 'view-articles',
        name: 'view-articles',
        component: ViewArticles,
        meta: { title: 'View Articles', roles: ['admin'] },  //admin
      },
    ],
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: { title: 'SignUp' }, //public
  },
  {
    path: '/about',
    name: 'about',
    component: AboutUsView,
    meta: { title: 'About Us' }, //public
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' },  //public
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUsView,
    meta: { title: 'Contact Us' }, //public
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: { title: 'Cart' }, //public
  },
  {
    path: '/teaching',
    name: 'teaching',
    component: TeachUdemyView,
    meta: { title: 'Teach with us' }, //public
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
    meta: { title: 'Edit Profile', roles: ['admin', 'student'] }, //admin,student
  },
  {
    path: '/change-password',
    name: 'change-password',
    component: ChangePassword,
    meta: { title: 'Change Password', roles: ['admin', 'student'] }, //admin,student
  },
  {
    path: '/course/:slug',
    name: 'CourseDetails',
    component: CourseDetailsView,
    meta: { title: 'Course Details', roles: ['student'] },  //student
  },
  {
    path: '/purchase-course-details/:slug',
    name: 'PurchaseCourseDetails',
    component: PurchaseCourseDetailView,
    meta: { title: 'Course Details', roles: ['student'] }, //student
  },
  {
    path: '/page-settings',
    name: 'PageSettings',  // Match exactly with what you're using in $router.push
    component: PageSettingView,
    meta: { title: 'Page Settings' , roles: ['admin']}, //admin
    children: [
      {
        path: ':slug',
        name: 'PageEditor',
        component: QuillEditorComponent,
        meta: { title: 'Page Editor', roles: ['admin'] }, //admin
        props: true,
      },
    ],
  },

  {
    path: '/subscriptions', // Add the subscription route
    name: 'subscriptions',
    component: SubscriptionView,
    meta: { title: 'Subscriptions' , roles: ['student']}, //admin
  },
  {
    path: '/active-subscriptions', 
    name: 'active-subscriptions',
    component: ActiveSubscription,
    meta: { title: 'Active Subscriptions' , roles: ['admin']}, //admin
  },

  {
    path: '/site-settings',
    name: 'SiteSettings', 
    component: SiteSettings,
    meta: { title: 'Site Settings', roles: ['admin'] }, //admin
  },
  {
    path: '/purchase-courses', // Define the path for your PurchaseCourses page
    name: 'PurchaseCourses',
    component: PurchaseCourses,
    meta: { title: 'Purchase Courses', roles: ['student'] }, //student
  },
  {
    path: '/articles/:slug', // Add route for article details
    name: 'ArticleDetails',
    component: ArticleDetailsView,
    meta: { title: 'Article Details', roles: ['student','admin'] },  //student
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  // Set the page title based on route meta or fallback to default
  document.title = to.meta.title || 'Udemy Clone';

  // Route guard logic
  RouteGuard(to, from, next);
});


export default router;