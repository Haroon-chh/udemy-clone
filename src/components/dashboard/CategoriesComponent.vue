<template>
    <div class="container">
      <!-- Heading and Paragraph -->
      <div class="text-center mb-4">
        <h2>Explore Our Categories</h2>
        <p>Browse through a variety of categories to find the courses that suit you best.</p>
      </div>
  
      <!-- Main Categories Navigation -->
      <nav class="nav categories-nav justify-content-center mb-4">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="fetchCourseCategories(category.id)"
          :class="['btn-category', { active: selectedCategoryId === category.id }]"
          class="btn-category"
        >
          {{ category.title }}
          <span v-if="category.learners" class="learners-count">{{ category.learners }} learners</span>
        </button>
      </nav>
  
      <!-- Course Categories -->
      <div v-if="courseCategories.length > 0" class="course-categories d-flex justify-content-center">
        <div
          v-for="courseCategory in courseCategories"
          :key="courseCategory.id"
          class="course-category-card"
        >
          <p class="course-category-title">{{ courseCategory.title }}</p>
        </div>
      </div>
      <div v-else class="text-center mt-3">Select a category to see course categories</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import ApiServices from '@/services/ApiServices';
  
  export default {
    name: 'CategoriesComponent',
    setup() {
      const categories = ref([]);
      const courseCategories = ref([]);
      const selectedCategoryId = ref(null);
  
      const fetchCategories = async () => {
        try {
          const response = await ApiServices.GetRequest('/categories');
          categories.value = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
  
      const fetchCourseCategories = async (categoryId) => {
        selectedCategoryId.value = categoryId;
        try {
          const response = await ApiServices.GetRequest(`/categories/${categoryId}/course-categories`);
          courseCategories.value = response.data;
        } catch (error) {
          console.error('Error fetching course categories:', error);
        }
      };
  
      onMounted(() => {
        fetchCategories();
      });
  
      return {
        categories,
        courseCategories,
        selectedCategoryId,
        fetchCourseCategories,
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Heading */
  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
  p {
    font-size: 1.1rem;
    color: #555;
  }
  
  /* Main Categories */
  .categories-nav {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .btn-category {
    background-color: transparent;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: silver;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: color 0.3s;
    cursor: pointer;
    position: relative;
  }
  
  .learners-count {
    font-size: 0.75rem;
    color: gray;
    margin-top: 0.25rem;
  }
  
  .btn-category:hover {
    color: black;
  }
  
  .btn-category.active::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: black;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  
  /* Course Categories */
  .course-categories {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .course-category-card {
    width: 220px;
    height: 200px;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .course-category-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  </style>
  