<template>
  <div>
    <h1>My Enrolled Courses</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.thumbnail" :alt="course.title" />
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
        <p><strong>Price:</strong> {{ course.price }}</p>
        <p><strong>Discounted Price:</strong> {{ course.discounted_price }}</p>
        <p><strong>Duration:</strong> {{ course.duration }} hours</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AuthApiServices from '@/services/AuthApiServices.js'; // Ensure the correct path to AuthApiServices
// import ApiServices from '@/services/ApiServices';
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
.course-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}
.course-card img {
  width: 150px;
  height: auto;
}
</style>
