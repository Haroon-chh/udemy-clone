<template>
    <div class="course-details-container">
      <h1>{{ course.title }}</h1>
      <img :src="course.thumbnail_url" alt="Course Thumbnail" />
      <p>{{ course.description }}</p>
      <ul>
        <li v-for="(item, index) in course.short_description" :key="index">
          {{ item }}
        </li>
      </ul>
      <p>Price: <s>${{ course.price }}</s> <strong>${{ course.discounted_price }}</strong></p>
      <p>Duration: {{ course.duration }} hours</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ApiServices from '@/services/ApiServices';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'CourseDetailsComponent',
    setup() {
      const course = ref({});
      const route = useRoute();
  
      const fetchCourseDetails = async () => {
        try {
          const slug = route.params.slug;
          const response = await ApiServices.GetRequest(`/courses/${slug}`);
          course.value = response.data || {};
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };
  
      onMounted(() => {
        fetchCourseDetails();
      });
  
      return {
        course,
      };
    },
  };
  </script>
  
  <style scoped>
  .course-details-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  img {
    width: 100%;
    max-width: 400px;
    margin: 1rem 0;
  }
  </style>
  