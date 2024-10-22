<template>
  <div class="course-details-container">
    <div class="course-card">
      <div class="image-container" v-if="course && course.thumbnail_url">
        <img
          class="course-thumbnail"
          :src="course.thumbnail_url"
          alt="Course Thumbnail"
          ref="thumbnail"
        />
      </div>
      <div class="content" v-if="course">
        <h1 class="course-title">{{ course.title }}</h1>
        <p class="course-description">{{ course.description }}</p>
        <ul class="course-features">
          <li v-for="(item, index) in course.short_description" :key="index">
            <i class="feature-icon"></i> {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Articles Section -->
    <div class="articles-section" v-if="articles.length">
      <h2 class="text-center">Related Articles</h2>
      <div class="articles-list">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <h3>{{ article.title }}</h3>
          <img v-if="article.image_url" :src="article.image_url" alt="Article Image" />
          <router-link :to="`/articles/${article.slug}`" class="read-more">
            Read more
          </router-link>
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
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
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
    const store = useStore();
    const route = useRoute();
    const slug = route.params.slug;

    const course = computed(() => store.getters['PurchaseStore/getCourse']);
    const articles = computed(() => store.getters['PurchaseStore/getArticles']);
    const isAdded = computed(() => store.getters['PurchaseStore/isCourseAdded']);
    const showSuccessPopup = computed(() => store.getters['PurchaseStore/isSuccessPopupVisible']);
    const showErrorPopup = computed(() => store.getters['PurchaseStore/isErrorPopupVisible']);
    const popupMessage = computed(() => store.getters['PurchaseStore/getPopupMessage']);

    onMounted(() => {
      store.dispatch('PurchaseStore/fetchCourseDetails', slug).then(() => {
        // Only attempt to check the cart if course data is available
        if (course.value && course.value.id) {
          store.dispatch('PurchaseStore/checkIfAddedToCart', course.value.id);
        }
      });
      store.dispatch('PurchaseStore/fetchArticles', slug);
    });

    const addToCart = () => {
      if (course.value) {
        store.dispatch('PurchaseStore/addToCart', course.value);
      }
    };

    return {
      course,
      articles,
      isAdded,
      showSuccessPopup,
      showErrorPopup,
      popupMessage,
      addToCart,
    };
  },
};
</script>


<style scoped>
.course-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  /* box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); */
  font-family: 'Arial', sans-serif;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.course-card {
  display: flex;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.content {
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.course-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #34495e;
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
  font-size: 1rem;
  color: #34495e;
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
  font-size: 1.4rem;
  color: #1f2937;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
}

.discounted-price {
  color: #ef4444;
  font-weight: bold;
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

.articles-section {
  margin-top: 2rem;
}

.articles-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.article-card {
  width: 48%;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.article-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.article-card img {
  max-width: 100%;
  border-radius: 8px;
}

.read-more {
  display: inline-block;
  margin-top: 0.5rem;
  color: #2563eb;
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 600px) {
  .course-details-container {
    padding: 1rem;
  }

  .course-title {
    font-size: 2rem;
  }

  .course-description {
    font-size: 1rem;
  }

  .course-features li {
    font-size: 0.9rem;
  }

  .price {
    font-size: 1.2rem;
  }

  .enroll-button {
    width: 100%;
  }

  .articles-list {
    flex-direction: column;
  }

  .article-card {
    width: 100%;
  }
}
</style>









