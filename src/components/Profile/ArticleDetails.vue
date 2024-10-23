<template>
  <div class="article-details-container">
    <!-- Display article title -->
    <h1>{{ article.title }}</h1>

    <!-- Display article image if available -->
    <div class="image-container">
      <img v-if="article.image_url" :src="article.image_url" alt="Article Image" />
    </div>

    <!-- Display article body -->
    <p class="article-body">{{ article.body }}</p>

    <!-- Display additional article details -->
    <transition name="fade">
      <div class="article-details" v-if="Object.keys(article).length">
        <h2>Article Details</h2>
        <ul>
          <li>
            <i class="fas fa-book"></i>
            <strong>Course ID:</strong> {{ article.course_id }}
          </li>
          <li>
            <i :class="statusIconClass(article.status)"></i>
            <strong>Status:</strong> {{ article.status }}
          </li>
          <li>
            <i class="fas fa-calendar-alt"></i>
            <strong>Created At:</strong> {{ new Date(article.created_at).toLocaleString() }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AuthApiServices from '@/services/AuthApiServices'; // Assuming this is the correct service

export default {
  name: 'ArticleDetails',
  setup() {
    const article = ref({});
    const route = useRoute();

    const fetchArticleDetails = async () => {
      try {
        const slug = route.params.slug;
        const token = localStorage.getItem('access_token'); // Get token from localStorage

        if (token) {
          const response = await AuthApiServices.GetRequest(`/articles/${slug}`, {}, token);
          if (response.data && response.data.article) {
            article.value = response.data.article; // Set article data
          }
        } else {
          console.error('No access token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };

    onMounted(() => {
      fetchArticleDetails(); // Fetch article details on component mount
    });

    const statusIconClass = (status) => {
      // Define icon classes based on status
      return status === 'published'
        ? 'fas fa-check-circle status-success' // Green tick for published
        : 'fas fa-times-circle status-failed'; // Red cross for other statuses
    };

    return {
      article,
      statusIconClass,
    };
  },
};
</script>

<style scoped>
.article-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  opacity: 0; /* Start invisible for fade-in effect */
  animation: fadeIn 0.5s forwards; /* Apply fade-in animation */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Fade in to full visibility */
  }
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center; /* Center the title */
}

.image-container {
  text-align: center;
  margin-bottom: 1.5rem;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.8; /* Increased line height for better readability */
  color: #34495e; /* Darker text color for contrast */
  margin-bottom: 2rem;
  padding: 0 1rem; /* Add padding for body text */
}

.article-details {
  margin-top: 2rem;
  border-top: 2px solid #ecf0f1;
  padding-top: 1.5rem;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-transform: uppercase; /* Uppercase for a modern look */
  letter-spacing: 1px; /* Add letter spacing for a refined appearance */
}

ul {
  list-style-type: none;
  padding: 0;
  color: #34495e;
}

li {
  font-size: 1.1rem;
  margin-bottom: 1rem; /* Increased margin for spacing */
  display: flex;
  align-items: center; /* Center icons and text */
  transition: transform 0.2s; /* Animation on hover */
}

li:hover {
  transform: scale(1.05); /* Slightly enlarge the list item on hover */
}

strong {
  color: #2c3e50;
  margin-left: 0.5rem; /* Add some space between icon and text */
}

/* Icon styles */
i {
  margin-right: 0.5rem; /* Add space between icon and text */
  font-size: 1.5rem; /* Adjust icon size for visibility */
  transition: color 0.3s, transform 0.3s; /* Animation on hover */
}

i:hover {
  transform: scale(1.2); /* Slightly enlarge the icon on hover */
}

/* Status icon colors */
.status-success {
  color: #28a745; /* Green color for success */
}

.status-failed {
  color: #dc3545; /* Red color for failed status */
}

/* Responsive Styles */
@media (max-width: 600px) {
  .article-details-container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .article-body {
    font-size: 1rem;
  }

  li {
    font-size: 1rem;
  }
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
