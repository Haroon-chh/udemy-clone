<template>
  <footer class="footer text-white py-1">
    <div class="container">
      <!-- Heading and Logo Section in Same Line -->
      <div class="row align-items-center mb-4">
        <div class="col d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start">
          <h5 class="mb-6 responsive-text">
            Top companies choose <span class="text-primary">Udemy Business</span> to build in-demand career skills.
          </h5>
          <img src="../assets/logo-bar.png" alt="logo bar" class="img-fluid logo ms-md-3 mt-3 mt-md-0" />
        </div>
      </div>
      <hr>

      <!-- Links Section -->
      <div class="row text-center text-md-start">
        <div class="col-12 col-md-3 mb-3">
          <ul class="list-unstyled">
            <li><router-link to="#">Udemy Business</router-link></li>
            <li><router-link to="/teaching">Teach on Udemy</router-link></li>
            <li><router-link to="#">Get the app</router-link></li>
            <li><router-link to="/about">About us</router-link></li>
            <li><router-link to="/contactUs">Contact us</router-link></li>
          </ul>
        </div>
        <div class="col-12 col-md-3 mb-3">
          <ul class="list-unstyled">
            <li><router-link to="#">Careers</router-link></li>
            <li><router-link to="#">Blog</router-link></li>
            <li><router-link to="#">Help and Support</router-link></li>
            <li><router-link to="#">Affiliate</router-link></li>
            <li><router-link to="#">Investors</router-link></li>
          </ul>
        </div>
        <div class="col-12 col-md-3 mb-3">
          <ul class="list-unstyled">
            <li><router-link to="#">Terms</router-link></li>
            <li><router-link to="#">Privacy policy</router-link></li>
            <li><router-link to="#">Cookie settings</router-link></li>
            <li><router-link to="#">Sitemap</router-link></li>
            <li><router-link to="#">Accessibility statement</router-link></li>
          </ul>
        </div>
        <div class="col-12 col-md-3 mb-3 d-flex flex-column align-items-md-end align-items-center">
          <button class="btn btn-outline-light btn-bg mb-3">
            <i class="fas fa-globe"></i> English
          </button>
        </div>
      </div>
      <!-- Logo and Copyright Section Below the Links -->
      <div class="row text-center justify-content-center mt-4">
        <div class="col-12 d-flex flex-column align-items-center">
          <img src="../assets/udemylogo2.png" alt="Udemy Logo" class="udemy-logo mb-3" id="logo-udemy">
          <small>&copy; 2024 Udemy, Inc.</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
/* Remove margin/padding from the body and footer */
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}

/* Make sure footer covers the full width */
.footer {
  background-color: #2e2f31;
  width: 100%;
  padding: 20px 0;
  position: relative;
  bottom: 0;
}

/* Flex the body content and footer to ensure footer stays at the bottom */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
  padding: 15px;
}



/* Responsive Text and Logo */
.responsive-text {
  font-size: 1.2rem;
}

@media (min-width: 768px) {
  .responsive-text {
    font-size: 1.5rem;
  }
}

.logo {
  height: 30px; /* Smaller logo for small screens */
}

@media (min-width: 768px) {
  .logo {
    height: 40px; /* Larger logo for medium and large screens */
  }
}

/* Udemy Logo Next to Copyright Text */
.udemy-logo {
  height: 35px;
  width: auto;
}

@media (min-width: 768px) {
  .udemy-logo {
    height: 30px;
  }
}

ul {
  padding-left: 0;
}

ul li {
  color: #ccc;
  font-size: 14px;
  margin-bottom: 8px;
}

ul li:hover {
  color: #fff;
  cursor: pointer;
  text-decoration: underline;
}
a{
  text-decoration: none;
  color: #ccc;
}
a:hover{
  color: #ccc;
}

button {
  border-radius: 5px;
  border: 1px solid #ccc;
}

button:hover {
  background-color: #fff;
}

small {
  font-size: 16px;
  color: #fff;
}

.dashboard-view {
  padding: 0px;
}
</style>



