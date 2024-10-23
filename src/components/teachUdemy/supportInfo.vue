<template>
    <div class="container  d-flex flex-column align-items-center justify-content-center " >
      <!-- For larger screens (laptops, desktops) -->
      <div class="row w-100 d-none d-lg-flex align-items-center">
        <!-- Left Image -->
        <div class="col-lg-4 p-0 d-flex justify-content-start">
          <img
            src="@/assets/support-1LS.jpg"
            id="left-img"
            alt="Left image"
            class="img-fluid larger-image"
          />
        </div>
  
        <!-- Center Text Container -->
        <div class="col-lg-4 text-center px-4">
          <h2 class="header-lg">You won’t have to do it alone</h2>
          <p class="paragraph-lg">
            Our <strong>Instructor Support Team</strong> is here to answer your questions and review your test video,
            while our <strong>Teaching Center</strong> gives you plenty of resources to help you through the process.
            Plus, get the support of experienced instructors in our online community.
          </p>
          <a href="#" class="link-lg">Need more details before you start? Learn more.</a>
        </div>
  
        <!-- Right Image -->
        <div class="col-lg-4 p-0 d-flex justify-content-end">
          <img
            src="@/assets/support-2LS.jpg"
            alt="Right image"
            id="right-img"
            class="img-fluid larger-image"
          />
        </div>
      </div>
  
      <!-- For mobile and small screens -->
      <div class="d-lg-none">
        <div class="row">
          <!-- Image on Top -->
          <div class="col-12" id="right-img-mobile">
            <img
              src="@/assets/support-1SS.jpg"
              alt="Mobile image"
              class="img-fluid mobile-image"
            />
          </div>
  
          <!-- Text Below Image -->
          <div class="col-12 text-center mt-3 text">
            <h1 class="header-sm">You won’t have to do it alone</h1>
            <p class="paragraph-sm">
              Our <strong>Instructor Support Team</strong> is here to answer your questions and review your test video,
              while our <strong>Teaching Center</strong> gives you plenty of resources to help you through the process.
              Plus, get the support of experienced instructors in our online community.
            </p>
            <a href="#" class="mb-5 fs-10 link-sm">Need more details before you start? Learn more.</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResponsiveSupportComponent",
  };
  </script>
  
  <style scoped>
  /* Larger screens styles */
  .larger-image {
    width: 100%;
    height: auto;
  }
  
  #left-img {
    margin-left: 0; /* Align left image */
  }
  
  #right-img {
    margin-right: 0; /* Align right image */
  }
  
  .img-fluid {
    margin-bottom: 0;
    max-width: 100%;
  }
  
  .header-lg {
    font-size: 2rem; /* Adjusted large screen heading font size */
  }
  
  .paragraph-lg {
    font-size: 1rem; /* Larger screen paragraph font size */
  }
  
  .link-lg {
    font-size: 1rem; /* Larger screen link font size */
  }
  
  /* Adding padding between images and content */
  .px-4 {
    padding-left: 40px;
    padding-right: 40px;
  }
  
  .row {
    align-items: center; /* Center align items vertically */
  }
  
  /* ---- Small Screen (768px or less) Styles ---- */
  @media (max-width: 768px) {
    .mobile-image {
      width: 100%;
      max-width: 350px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  
    .row {
      text-align: center;
      margin-top: 10px;
    }
  
    .header-sm {
      font-size: 1.125rem;
      margin-bottom: 5px;
    }
  
    .paragraph-sm {
      font-size: 0.55rem;
      margin-bottom: 0;
    }
  
    .link-sm {
      font-size: 9px;
      margin-bottom: 40px;
      color: #5d2bd1;
    }
  }
  </style>
  