import store from "../store";

const RouteGuard = (to, from, next) => {
  // Define public pages that don't require authentication
  const publicPages = ['/login', '/signup', '/about', '/ContactUs', '/cart', '/teaching','/dashboard'];

  // Get the logged-in user's role (assuming the role is available in Vuex store)
  const userRole = store.getters.getUserRole; 

  // Check if the route is public (no authentication required)
  const authRequired = !publicPages.includes(to.path);

  // If the route requires authentication and the user is not logged in, redirect to login
  if (authRequired && !userRole) {
    return next('/login');
  }

  // // If user is logged in and tries to access a public page, redirect to dashboard
  // if (userRole && publicPages.includes(to.path)) {
  //   return next('/dashboard');
  // }

  // Check if the route has specific roles defined in its meta field
  const routeRoles = to.meta.roles || [];  // Get allowed roles for the route (if any)

  // If roles are specified, verify if the user's role matches one of the allowed roles
  if (routeRoles.length && !routeRoles.includes(userRole)) {
    // If the user's role is not allowed, redirect to the dashboard
    return next('/dashboard');
  }

  // If no role restrictions or user has the required role, allow navigation
  next();
};

export default RouteGuard;
