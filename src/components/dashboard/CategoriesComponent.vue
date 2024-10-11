<template>
  <div class="container-fluid">
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
      >
        {{ category.title }}
        <span v-if="category.learners" class="learners-count">{{ category.learners }} learners</span>
      </button>
    </nav>

    <!-- Course Categories -->
    <div v-if="courseCategories.length > 0" class="course-categories d-flex justify-content-center mb-4">
      <button
        v-for="courseCategory in courseCategories"
        :key="courseCategory.id"
        @click="fetchCourses(courseCategory.id)"
        :class="['btn-course-category', { active: selectedCourseCategoryId === courseCategory.id }]"
      >
        {{ courseCategory.title }}
        <span v-if="courseCategory.learners" class="learners-count">{{ courseCategory.learners }} learners</span>
      </button>
    </div>
    <div v-else class="text-center mt-3">Select a category to see course categories</div>

    <!-- Courses Display -->
    <div v-if="courses.length > 0" class="courses d-flex flex-wrap justify-content-center">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.thumbnail_url" alt="Course thumbnail" class="course-thumbnail" />
        <div class="course-details">
          <h4>{{ course.title }}</h4>
          <p>{{ course.description }}</p>
          <p class="price">
            <span class="discounted-price">${{ course.discounted_price }}</span>
            <span class="original-price">${{ course.price }}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-3">Select a course category to see courses</div>
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
    const courses = ref([]);
    const selectedCategoryId = ref(null);
    const selectedCourseCategoryId = ref(null);

    const fetchCategories = async () => {
      try {
        const response = await ApiServices.GetRequest('/categories');
        categories.value = response.data;

        // Automatically select and load the first category if categories are present
        if (categories.value.length > 0) {
          fetchCourseCategories(categories.value[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchCourseCategories = async (categoryId) => {
      selectedCategoryId.value = categoryId;
      try {
        const response = await ApiServices.GetRequest(`/categories/${categoryId}/course-categories`);
        courseCategories.value = response.data;

        // Automatically select and load courses for the first course category if present
        if (courseCategories.value.length > 0) {
          fetchCourses(courseCategories.value[0].id);
        }
      } catch (error) {
        console.error('Error fetching course categories:', error);
      }
    };

    const fetchCourses = async (courseCategoryId) => {
      selectedCourseCategoryId.value = courseCategoryId;
      try {
        const response = await ApiServices.GetRequest(`/course-categories/${courseCategoryId}/course`);
        courses.value = response.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      courseCategories,
      courses,
      selectedCategoryId,
      selectedCourseCategoryId,
      fetchCourseCategories,
      fetchCourses,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Main Categories */
.categories-nav, .course-categories {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
}

.btn-category, .btn-course-category {
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

.btn-category:hover, .btn-course-category:hover {
  color: black;
}

.btn-category.active::after, .btn-course-category.active::after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: black;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Courses */
.courses {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.course-card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  text-align: left;
}

.course-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.course-details {
  padding: 1rem;
}

.course-details h4 {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.course-details p {
  font-size: 0.9rem;
  color: #555;
}

.price {
  margin-top: 1rem;
}

.discounted-price {
  color: red;
  font-weight: bold;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 0.5rem;
}
</style>
