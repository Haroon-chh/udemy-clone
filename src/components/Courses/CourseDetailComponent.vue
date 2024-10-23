<template>
  <div>
    <div class="course-details-container">
      <div class="course-card">
        <div class="image-container">
          <img
            class="course-thumbnail"
            :src="course.thumbnail_url"
            alt="Course Thumbnail"
            ref="thumbnail"
          />
        </div>
        <div class="content">
          <h1 class="course-title">{{ course.title }}</h1>
          <p class="course-description">{{ course.description }}</p>
          <ul class="course-features">
            <li v-for="(item, index) in course.short_description" :key="index">
              <i class="feature-icon"></i> {{ item }}
            </li>
          </ul>
          <div class="course-pricing">
            <p class="price">
              <span class="original-price">${{ course.price }}</span>
              <span class="discounted-price">${{ course.discounted_price }}</span>
            </p>
            <p class="duration">
              <i class="fas fa-clock duration-icon"></i> {{ course.duration }} hours
            </p>
          </div>
          <!-- Buy Button -->
          <button class="enroll-button" @click="addToCart(course)">Buy</button>
        </div>
      </div>
    </div>

    <div class="learning-points">
      <h2 class="learning-points-title">What you'll learn</h2>
      <div class="learning-points-content">
        <div class="learning-points-column">
          <ul class="list-unstyled">
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              After the course, you will be able to build ANY website you want.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Work as a freelance web developer.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Master backend development with Node.
            </li>
          </ul>
        </div>
        <div class="learning-points-column">
          <ul class="list-unstyled">
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Learn the latest technologies, including Javascript, React, Node, and even Web3 development.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Build fully-fledged websites and web apps for your startup or business.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Master frontend development with React.
            </li>
            <li class="mb-3">
              <i class="bi bi-check2"></i>
              Learn professional developer best practices.
            </li>
          </ul>
        </div>
      </div>
    </div>
     <div class="container py-5">
    <!-- Requirements Section -->
    <div class="requirements-section my-5">
      <h2 class="learning-points-title">Requirements</h2>
      <ul class="requirements-list text-center">
        <li>No programming experience needed - I'll teach you everything you need to know</li>
        <li>A computer with access to the internet</li>
        <li>No paid software required</li>
        <li>I'll walk you through, step-by-step how to get all the software installed and set up</li>
      </ul>
    </div>

    <!-- Description Section -->
    <div class="description-section my-5">
      <h2 class="learning-points-title" >Description</h2>
      <p>
        Welcome to the Complete Web Development Bootcamp, <strong>the only course you need</strong> 
        to learn to code and become a full-stack web developer. 
        With 150,000+ ratings and a 4.8 average, my Web Development course is 
        one of the <strong>HIGHEST RATED</strong> courses in the history of Udemy!
      </p>
    </div>
  </div>
   <div class="container py-5">
    <div class="row text-center">
      <div class="col-12">
        <h2 class="learning-points-title" >This course includes:</h2>
      </div>
      <div class="col-lg-4 col-md-6 my-3" v-for="(item, index) in courseDetails" :key="index">
        <div class="d-flex align-items-center justify-content-center">
          <i :class="item.icon"></i>
          <div class="ps-3">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Success Popup for "Course added to cart" -->
    <SuccessPopup v-if="showSuccessPopup" :show="showSuccessPopup" :message="popupMessage" />

    <!-- Error Popup for "Already in cart" message -->
    <ErrorPopup v-if="showErrorPopup" :show="showErrorPopup" :message="popupMessage" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ApiServices from '@/services/ApiServices';
import { useRoute } from 'vue-router';
import SuccessPopup from '@/components/SuccessPopup.vue'; // Import SuccessPopup
import ErrorPopup from '@/components/ErrorPopup.vue'; // Import ErrorPopup

export default {
  name: 'CourseDetailsComponent',
  components: {
    SuccessPopup, // Register SuccessPopup
    ErrorPopup, // Register ErrorPopup
  },
  setup() {
    const course = ref({});
    const courseDetails = ref([]);
    const isAdded = ref(false); // To track if the course is already added
    const showSuccessPopup = ref(false); // For "Course added to cart" message
    const showErrorPopup = ref(false); // For "Already in cart" message
    const popupMessage = ref(''); // Message to display in the popup
    const route = useRoute();

    const fetchCourseDetails = async () => {
      try {
        const slug = route.params.slug;
        const response = await ApiServices.GetRequest(`/courses/${slug}`);
        course.value = response.data || {};

        courseDetails.value = [
          { icon: 'bi bi-play-circle', description: `${course.value.videoHours || 0} hours on-demand video` },
          { icon: 'bi bi-code-slash', description: `${course.value.codingExercises || 0} coding exercises` },
          { icon: 'bi bi-file-earmark-text', description: `${course.value.articles || 0} articles` },
          { icon: 'bi bi-cloud-arrow-down', description: `${course.value.downloadableResources || 0} downloadable resources` },
          { icon: 'bi bi-phone', description: `Access on mobile and TV` },
          { icon: 'bi bi-trophy', description: `Certificate of completion` },
        ];

        checkIfAddedToCart(course.value.id);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    const checkIfAddedToCart = (courseId) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      isAdded.value = cart.some(item => item.id === courseId);
    };

    const addToCart = (course) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (isAdded.value) {
        popupMessage.value = 'This course is already in your cart!';
        showPopup('error');
      } else {
        cart.push(course);
        localStorage.setItem('cart', JSON.stringify(cart));
        isAdded.value = true;
        popupMessage.value = 'Course added to cart!';
        showPopup('success');
        animateToCart();
        updateCartCount();
      }
    };

    const showPopup = (type) => {
      if (type === 'success') {
        showSuccessPopup.value = true;
        setTimeout(() => {
          showSuccessPopup.value = false;
        }, 3000); // Hide success popup after 3 seconds
      } else if (type === 'error') {
        showErrorPopup.value = true;
        setTimeout(() => {
          showErrorPopup.value = false;
        }, 3000); // Hide error popup after 3 seconds
      }
    };

    const animateToCart = () => {
      const thumbnail = document.querySelector('.course-thumbnail');
      const cartIcon = document.querySelector('.material-icons.shopping_cart');

      if (thumbnail && cartIcon) {
        const thumbnailRect = thumbnail.getBoundingClientRect();
        const cartIconRect = cartIcon.getBoundingClientRect();

        const clone = thumbnail.cloneNode(true);
        document.body.appendChild(clone);
        clone.style.position = 'absolute';
        clone.style.top = `${thumbnailRect.top}px`;
        clone.style.left = `${thumbnailRect.left}px`;
        clone.style.width = `${thumbnailRect.width}px`;
        clone.style.transition = 'all 1s ease-in-out';
        clone.style.zIndex = 1000;

        setTimeout(() => {
          clone.style.top = `${cartIconRect.top}px`;
          clone.style.left = `${cartIconRect.left}px`;
          clone.style.width = '20px';
          clone.style.height = '20px';
          clone.style.opacity = '0';

          setTimeout(() => {
            document.body.removeChild(clone);
          }, 1000);
        }, 100);
      }
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const event = new Event('storage'); // This triggers a localStorage update
      localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
      window.dispatchEvent(event); // Dispatch the event
    };

    onMounted(() => {
      fetchCourseDetails();
    });

    return {
      course,
      courseDetails,
      addToCart,
      isAdded,
      showSuccessPopup,
      showErrorPopup,
      popupMessage,
    };
  },
};
</script>

<style scoped>

.course-details-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  min-height: 100vh;
}

.course-card {
  display: flex;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.image-container {
  flex: 1;
  max-width: 400px;
}

.course-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.course-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

.course-features {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.course-features li {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #374151;
  margin: 0.5rem 0;
}

.feature-icon {
  width: 8px;
  height: 8px;
  background-color: #2563eb;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.course-pricing {
  margin: 1.5rem 0;
}

.price {
  font-size: 1.2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
}

.discounted-price {
  color: #ef4444;
  font-weight: bold;
  font-size: 1.4rem;
}

.duration {
  font-size: 1rem;
  color: #6b7280;
  display: flex;
  align-items: center;
}

.duration-icon {
  margin-right: 0.5rem;
  color: #1e40af;
}

.enroll-button {
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1.5rem;
}

.enroll-button:hover {
  background: linear-gradient(135deg, #1e40af, #2563eb);
}

/* Learning Points Section */
.learning-points {
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.learning-points-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 1.5rem;
}

.learning-points-content {
  display: flex;
  justify-content: space-between;
}

.learning-points-column {
  width: 48%;
}

.learning-points-column ul {
  padding: 0;
}

.bi {
  color: green;
}

/* Responsive Design */
@media (max-width: 768px) {
  .course-card {
    flex-direction: column;
  }

  .learning-points-content {
    flex-direction: column;
  }

  .learning-points-column {
    width: 100%;
  }
}

i {
  font-size: 2rem;
}

p {
  margin-bottom: 0;
  font-size: 1.2rem;
}

.requirements-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.requirements-list {
  list-style-type: none;
  padding-left: 20px;
  font-size: 1.1rem;
}

.requirements-list li {
  margin-bottom: 10px;
}

.description-section h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.description-section p {
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>
