<template>
    <div class="fullstory-container">
      <!-- Slider Section -->
      <div class="slider-container">
        <div
          class="slider"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div v-for="(story, index) in stories" :key="index" class="slide">
            <!-- Mobile View Layout: Logo, Image, Text Content -->
            <div class="mobile-content d-lg-none">
              <!-- Logo -->
              <img :src="story.logo" alt="Company logo" class="logo-mobile" />
  
              <!-- Image -->
              <img :src="story.image" alt="Story Image" class="story-image-mobile" />
  
              <!-- Text Content -->
              <h2 class="story-title-mobile">{{ story.title }}</h2>
              <div class="statistics-mobile">
                <div class="stat">
                  <h1 class="stat-number-mobile">{{ story.stat1.value }}</h1>
                  <p class="stat-text-mobile">{{ story.stat1.text }}</p>
                </div>
                <div class="stat">
                  <h1 class="stat-number-mobile">{{ story.stat2.value }}</h1>
                  <p class="stat-text-mobile">{{ story.stat2.text }}</p>
                </div>
              </div>
              <button class="read-story-btn-mobile">
                Read full story <span>→</span>
              </button>
            </div>
  
            <!-- Desktop View Layout: Left and Right Parts -->
            <div class="left-content d-none d-lg-block">
              <img :src="story.logo" alt="Company logo" class="logo" />
              <h2 class="story-title">{{ story.title }}</h2>
              <div class="statistics">
                <div class="stat">
                  <h1 class="stat-number">{{ story.stat1.value }}</h1>
                  <p class="stat-text">{{ story.stat1.text }}</p>
                </div>
                <div class="stat">
                  <h1 class="stat-number">{{ story.stat2.value }}</h1>
                  <p class="stat-text">{{ story.stat2.text }}</p>
                </div>
              </div>
              <button class="read-story-btn">
                Read full story <span>→</span>
              </button>
            </div>
  
            <!-- Right Part: Image Content for Desktop View -->
            <div class="right-content d-none d-lg-flex">
              <img :src="story.image" alt="Story Image" class="story-image" />
            </div>
          </div>
        </div>
  
        <!-- Slider Controls Positioned Below Button (Visible for Both Desktop and Mobile) -->
        <div class="slider-controls">
          <button @click="prevSlide" class="slider-btn prev-btn">←</button>
          <div class="indicators">
            <span
              v-for="(story, index) in stories"
              :key="index"
              :class="['indicator', { active: currentSlide === index }]"
            ></span>
          </div>
          <button @click="nextSlide" class="slider-btn next-btn">→</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        stories: [
          {
            logo: require('@/assets/FullStory/logo-boozallenhamilton-2.svg'),
            title: 'Capital One Accelerates Transformational Learning through Udemy Business',
            stat1: { value: '95%', text: 'of learners rated Udemy as “very helpful” to their success' },
            stat2: { value: '65%', text: 'increase in retention for in-demand tech roles' },
            image: require('@/assets/FullStory/UB_Case_Studies_Booz_Allen_image.png'),
          },
          {
            logo: require('@/assets/FullStory/logo-capitalone-2.svg'),
            title: 'Another Success Story with Udemy Business',
            stat1: { value: '90%', text: 'of learners saw career advancement' },
            stat2: { value: '60%', text: 'improvement in productivity' },
            image: require('@/assets/FullStory/capitalone-2x.png'),
          },
          {
            logo: require('@/assets/FullStory/logo-eventbrite-1.svg'),
            title: 'Delivery Hero Boosts Employee Retention through Upskilling Programs',
            stat1: { value: '85%', text: 'of employees improved their skill set' },
            stat2: { value: '70%', text: 'higher employee satisfaction' },
            image: require('@/assets/FullStory/eventbrite-2x.png'),
          },
          {
            logo: require('@/assets/FullStory/logo-toyota-1.svg'),
            title: 'Deloitte Empowers Workforce with Continuous Learning on Udemy',
            stat1: { value: '88%', text: 'of employees feel more confident in their roles' },
            stat2: { value: '75%', text: 'reduction in skill gaps' },
            image: require('@/assets/FullStory/toyota-2x.png'),
          },
        ],
      };
    },
    mounted() {
      if (window.innerWidth <= 768) {
        this.startAutoSlide(); // Enable auto-slide for mobile view
      }
    },
    methods: {
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.stories.length;
      },
      prevSlide() {
        this.currentSlide =
          (this.currentSlide - 1 + this.stories.length) % this.stories.length;
      },
      startAutoSlide() {
        setInterval(() => {
          this.nextSlide();
        }, 4000); // Auto-slide every 4 seconds
      },
    },
  };
  </script>
  
  <style scoped>
  /* Default Styles for Desktop */
  .fullstory-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden; /* Prevent overflow */
  }
  
  .slider-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: rgb(248, 249, 251);
  }
  
  .slider {
    display: flex;
    transition: transform 0.8s ease-in-out;
  }
  
  .slide {
    display: flex;
    width: 100%; /* Each slide takes 100% width of the container */
    min-height: 800px;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
    flex-shrink: 0; /* Prevent shrinking */
  }
  
  .left-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .logo {
    max-width: 150px;
    margin-bottom: 20px;
    align-self: flex-start; /* Align logo to the start */
  }
  
  .story-title {
    margin-top: 20px; /* Ensure space below the logo */
    font-family: "Udemy Sans", -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: rgb(45, 47, 49);
  }
  
  .statistics {
    display: flex;
    margin-top: 20px;
  }
  
  .stat {
    margin-right: 40px;
  }
  
  .stat-number {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 58px;
    color: rgb(45, 47, 49);
  }
  
  .stat-text {
    font-size: 16px;
    color: rgb(45, 47, 49);
  }
  
  .read-story-btn {
    margin-top: 20px;
    padding: 8px 16px; /* Reduced padding */
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 200px; /* Fixed width */
  }
  
  .read-story-btn span {
    margin-left: 10px;
    transition: margin-left 0.3s ease;
  }
  
  .read-story-btn:hover span {
    margin-left: 15px;
  }
  
  .right-content {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  
  .story-image {
    width: 500px; /* Fixed width */
    height: 500px; /* Fixed height */
    object-fit: cover; /* Maintain image ratio */
  }
  
  .slider-controls {
    display: flex;
    justify-content: flex-start; /* Align slider controls to the start */
    align-items: center;
    position: absolute;
    top: 80%; /* Adjust based on where you want it relative to the button */
    left: 0; /* Align to the left */
    transform: translateY(-50%); /* Center vertically */
  }
  
  .slider-btn {
    background-color: transparent;
    border: 1px solid #e0e0e0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
  }
  
  .slider-btn {
    color: #000; /* Always visible */
    border-color: #9b51e0;
  }

  .slider-btn, .indicators {
    margin-left: 40px; /* Apply margin to the individual elements to move them */
  }

  .slider-btn.prev-btn {
  margin-right: 0px; /* Add some space to the right of the left button */
}

.slider-btn.next-btn {
  margin-left: 0px; /* Add some space to the left of the right button */
}


  
  .slider-btn:hover {
    border-color: #000;
  }
  
  .indicators {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    background-color: #e0e0e0;
    border-radius: 50%;
    margin: 0 5px;
    transition: background-color 0.3s ease;
  }
  
  .indicator.active {
    background-color: #9b51e0; /* Active indicator color */
  }
  
  /* Mobile View Styles */
  @media only screen and (max-width: 768px) {
    .fullstory-container {
      padding: 0 20px; /* Padding for mobile view */
    }
  
    .slide {
      flex-direction: column; /* Stack elements vertically */
      align-items: center; /* Center-align the elements */
      padding: 20px 0; /* Adjust padding for mobile view */
    }
  
    .logo-mobile {
      align-self: center; /* Center-align logo for mobile */
      max-width: 80px;
      margin-bottom: 10px;
    }
  
    .story-image-mobile {
      width: 100%;
      height: auto;
      margin-bottom: 20px;
    }
  
    .story-title-mobile {
      font-size: 20px;
      line-height: 28px;
      text-align: center;
      margin: 20px 0;
    }
  
    .statistics-mobile {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  
    .stat-number-mobile {
      font-size: 28px;
      line-height: 34px;
    }
  
    .stat-text-mobile {
      font-size: 14px;
    }
  
    .read-story-btn-mobile {
      width: 100%;
      padding: 12px;
      font-size: 14px;
      cursor: pointer;
    }
  
    .slider-controls {
      position: relative;
      justify-content: center;
      top: 0;
      left: 0;
      margin-top: 10px;
    }
  
    .slider-btn {
      border: 1px solid #e0e0e0;
      background-color: #fff;
    }
  }
  </style>
  