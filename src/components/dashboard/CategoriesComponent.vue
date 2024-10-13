<template>
  <div class="container-fluid">
    <!-- Heading and Paragraph -->
    <div class="text-center mb-4">
      <h2>Explore Our Categories</h2>
      <p class="text-center">Browse through a variety of categories to find the courses that suit you best.</p>
    </div>

    <!-- Main Categories Navigation -->
    <nav class="nav categories-nav justify-content-center mb-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="fetchCourseCategories(category.id)"
        :class="['btn-category', { active: selectedCategoryId === category.id }]">
        {{ category.title }}
      </button>
    </nav>

    <!-- Course Categories -->
    <div v-if="courseCategories && courseCategories.length > 0" class="course-categories d-flex justify-content-center mb-4">
      <button
        v-for="courseCategory in courseCategories"
        :key="courseCategory.id"
        @click="fetchCourses(courseCategory.id)"
        :class="['btn-course-category', { active: selectedCourseCategoryId === courseCategory.id }]">
        <div class="category-content">
          <span class="category-title">{{ courseCategory.title }}</span>
          <span v-if="courseCategory.learners" class="learners-count">{{ courseCategory.learners }} learners</span>
        </div>
      </button>
    </div>
    <div v-else class="text-center mt-3">Select a category to see course categories</div>

    <!-- Courses Display -->
    <div v-if="courses && courses.length > 0" class="courses d-flex flex-wrap justify-content-center">
      <div v-for="course in courses" :key="course.id" class="course-card" @click="$router.push({ name: 'CourseDetails', params: { slug: course.slug } })">
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
    <div v-else class="text-center mt-3">Course doesn't exist</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ApiServices from '@/services/ApiServices';

export default {
  name: 'CategoriesComponent',
  setup() {
    const router = useRouter();
    const categories = ref([]);
    const courseCategories = ref([]);
    const courses = ref([]);
    const selectedCategoryId = ref(null);
    const selectedCourseCategoryId = ref(null);

    const fetchCategories = async () => {
      try {
        const response = await ApiServices.GetRequest('/categories');
        categories.value = response?.data || [];

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
        courseCategories.value = response?.data || [];

        if (courseCategories.value.length > 0) {
          fetchCourses(courseCategories.value[0].id);
        } else {
          courses.value = [];
        }
      } catch (error) {
        console.error('Error fetching course categories:', error);
        courseCategories.value = [];
        courses.value = [];
      }
    };

    const fetchCourses = async (courseCategoryId) => {
      selectedCourseCategoryId.value = courseCategoryId;
      try {
        const response = await ApiServices.GetRequest(`/course-categories/${courseCategoryId}/course`);
        courses.value = response?.data || [];
      } catch (error) {
        console.error('Error fetching courses:', error);
        courses.value = [];
      }
    };

    const goToCourseDetails = (slug) => {
      router.push({ name: 'CourseDetails', params: { slug } });
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
      goToCourseDetails,
    };
  },
};
</script>


<style scoped>
h2{
  font-family: 'Suisse Works', serif;
  font-weight: bold;
  font-size: 52px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.categories-nav, .course-categories {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
}

.btn-category, .btn-course-category {
  background-color: #f1f3f4;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #333;
  border-radius: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;
}

.btn-category.active, .btn-course-category.active {
  background-color: #333;
  color: white;
}

.category-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.category-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.learners-count {
  font-size: 0.75rem;
  color: #555;
}

.btn-category:hover, .btn-course-category:hover {
  background-color: #ddd;
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
