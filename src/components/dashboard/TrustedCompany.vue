<template>
  <div class="trusted-section my-3">
    <h3 class="trusted-text">
      Trusted by over 16,000 companies and millions of learners around the world
    </h3>
    <div class="logo-container">
      <div class="logo-scroll">
        <!-- Duplicate the logos for a smooth infinite scroll effect -->
        <img v-for="(logo, index) in duplicatedLogos" :key="index" :src="getImageUrl(logo)" :alt="logo.alt" class="company-logo" />
      </div>
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
  computed: {
    duplicatedLogos() {
      // Double the logos array for seamless infinite scrolling
      return [...this.logos, ...this.logos];
    }
  },
  methods: {
    getImageUrl(logo) {
      return require(`@/assets/${logo.src}`); // Ensure images are in assets folder
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
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  width: 100%;
}

.logo-scroll {
  display: inline-flex;
  gap: 120px; /* Increased gap between logos */
  animation: scroll 13s linear infinite;
}

.company-logo {
  max-width: 100px;
  max-height: 40px;
  object-fit: contain;
}

/* Smooth infinite scrolling animation */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
