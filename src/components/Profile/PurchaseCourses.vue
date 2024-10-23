<template>
  <section class="enrolled-courses">
    <h1 class="heading">My Enrolled Courses</h1>

    <div v-if="loading" class="loading-container">
      <i class="fas fa-spinner fa-spin"></i> Loading...
    </div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="courses-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <div class="thumbnail-wrapper">
          <img :src="course.thumbnail" :alt="course.title" class="course-thumbnail" />
        </div>
        <div class="course-content">
          <h2 class="course-title">{{ course.title }}</h2>
          <p class="course-description">{{ course.description }}</p>
          <div class="course-meta">
            <p><i class="fas fa-clock"></i> Duration: {{ course.duration }} hours</p>
            <p><i class="fas fa-tag"></i> 
              Price: <del>{{ course.price }}</del> 
              <span class="discount">{{ course.discounted_price }}</span>
            </p>
          </div>
          <button @click="$router.push({ name: 'PurchaseCourseDetails', params: { slug: course.slug } })" class="btn-details">View Details</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuthApiServices from '@/services/AuthApiServices.js'; // Ensure the correct path to AuthApiServices

const courses = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchEnrolledCourses = async () => {
  try {
    const response = await AuthApiServices.GetRequest('/enrollments');
    courses.value = response.data;
  } catch (err) {
    error.value = err.message || 'Failed to load enrolled courses';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchEnrolledCourses();
});
</script>

<style scoped>
.enrolled-courses {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.heading {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #2c3e50;
  font-family: 'Poppins', sans-serif;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #888;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 1.2rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.course-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.thumbnail-wrapper {
  width: 100%;
  height: 180px;
  position: relative;
}

.course-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.course-title {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
  font-weight: 600;
}

.course-description {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.course-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.course-meta p {
  display: flex;
  align-items: center;
}

.course-meta i {
  margin-right: 10px;
  color: #3498db;
}

.discount {
  color: #e74c3c;
  font-weight: bold;
}

.btn-details {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
  align-self: start;
}

.btn-details:hover {
  background-color: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .heading {
    font-size: 2rem;
  }
}

@media (min-width: 1200px) {
  .courses-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}
</style>
