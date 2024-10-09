<template>
    <div class="trusted-section my-3">
      <h3 class="trusted-text">
        Trusted by over 16,000 companies and millions of learners around the world
      </h3>
      <div class="logo-container">
        <!-- Each image corresponds to a company logo -->
        <img v-for="(logo, index) in logos" :key="index" :src="getImageUrl(logo)" :alt="logo.alt" class="company-logo" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrustedCompanies',
    data() {
      return {
        logos: [
          { src: 'citi_logo.svg', alt: 'Citi' },
          { src: 'cisco_logo.svg', alt: 'Cisco' },
          { src: 'ericsson_logo.svg', alt: 'Ericsson' },
          { src: 'vimeo_logo.svg', alt: 'Vimeo' },
          { src: 'procter_gamble.svg', alt: 'P&G' },
          { src: 'hewlett_packard.svg', alt: 'Hewlett Packard' },
          { src: 'volkswagen.svg', alt: 'Volkswagen' },
          { src: 'samsung_logo.svg', alt: 'Samsung' }
        ]
      };
    },
    methods: {
      getImageUrl(logo) {
        return require(`@/assets/${logo.src}`); // Make sure to have the images in your assets folder
      }
    }
  };
  </script>
  
  <style scoped>
  .trusted-section {
    text-align: center;
    padding: 50px 0;
    background-color: #F7F9FA; /* Slightly gray background */
  }
  
  .trusted-text {
    font-size: 18px;
    color: #777;
    margin-bottom: 30px;
  }
  
  .logo-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .company-logo {
    max-width: 100px;
    max-height: 40px;
    object-fit: contain; /* Ensures logos keep their aspect ratio */
  }
  </style>
  