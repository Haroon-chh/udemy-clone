<template>
    <div>
      <CourseDetailsComponent />
    </div>
  </template>
  
  <script>
  import CourseDetailsComponent from '../components/Courses/CourseDetailComponent.vue';
  
  export default {
    name: 'CourseDetailsView',
    components: {
      CourseDetailsComponent, // Register the component here
    },
  };
  </script>
  
  <style scoped>
  /* Optional CSS here */
  </style>
  