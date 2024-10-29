<template>
  <div class="container-fluid">
    <!-- Heading and Paragraph -->
    <div class="text-center mb-4">
      <h2>Explore Our Categories</h2>
      <p class="text-center">Browse through a variety of categories to find the courses that suit you best.</p>
    </div>

    <!-- Main Categories Navigation -->
<nav class="nav categories-nav justify-content-center mb-4">
  <span
    v-for="category in categories"
    :key="category.id"
    @click="fetchCourseCategories(category.id)"
    :class="['category-option', { active: selectedCategoryId === category.id }]">
    {{ category.title }}
  </span>
</nav>

    <!-- Course Categories -->
    <div v-if="courseCategories && courseCategories.course_categories && courseCategories.course_categories.length > 0" class="course-categories d-flex justify-content-start mb-4" style="overflow-x: auto; padding-left: 15px;">
      <button
        v-for="courseCategory in courseCategories.course_categories"
        :key="courseCategory.id"
        @click="fetchCourses(courseCategory.id)"
        :class="['btn-course-category', { active: selectedCourseCategoryId === courseCategory.id }]">
        <div class="category-content">
          <span class="category-title">{{ courseCategory.title }}</span>
        </div>
      </button>
    </div>
    <div v-else class="text-center mt-3">Select a category to see course categories</div>

    <!-- Courses Display with Scroller and Arrows -->
    <div class="course-scroller-container" v-if="courses.length > 4">
      <div class="scroll-arrow left-arrow" @click="scroll('left')">&#x2039;</div>
      <div class="courses d-flex" ref="courseScroller">
        <div
          v-for="course in courses"
          :key="course.id"
          class="course-card"
          @click="$router.push({ name: 'CourseDetails', params: { slug: course.slug } })"
        >
          <div class="course-thumbnail-wrapper">
            <img
              v-if="course.thumbnail"
              :src="course.thumbnail"
              alt="Course thumbnail"
              class="course-thumbnail"
            />
            <div v-else class="no-thumbnail">No Image</div>
          </div>
          <div class="course-details">
            <h4>{{ course.title }}</h4>
            <p>{{ course.description }}</p>
          </div>
        </div>
      </div>
      <div class="scroll-arrow right-arrow" @click="scroll('right')">&#x203A;</div>
    </div>

    <!-- Courses Display without Scroller if less than or equal to 4 -->
    <div v-if="courses.length <= 4" class="courses d-flex flex-wrap justify-content-center">
      <div
        v-for="course in courses"
        :key="course.id"
        class="course-card"
        @click="$router.push({ name: 'CourseDetails', params: { slug: course.slug } })"
      >
        <div class="course-thumbnail-wrapper">
          <img
            v-if="course.thumbnail"
            :src="course.thumbnail"
            alt="Course thumbnail"
            class="course-thumbnail"
          />
          <div v-else class="no-thumbnail">No Image</div>
        </div>
        <div class="course-details">
          <h4>{{ course.title }}</h4>
          <p>{{ course.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="courses.length === 0" class="text-center mt-3">No courses found</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CategoriesComponent',
  computed: {
    ...mapGetters('CategoriesStore', [
      'getCategories',
      'getCourseCategories',
      'getCourses',
      'getSelectedCategoryId',
      'getSelectedCourseCategoryId'
    ]),
    categories() {
      console.log('Categories:', this.getCategories);
      return this.getCategories;
    },
    courseCategories() {
      console.log('Course Categories:', this.getCourseCategories);
      return this.getCourseCategories;
    },
    courses() {
      console.log('Courses:', this.getCourses);
      return this.getCourses;
    },
    selectedCategoryId() {
      return this.getSelectedCategoryId;
    },
    selectedCourseCategoryId() {
      return this.getSelectedCourseCategoryId;
    }
  },
  methods: {
    ...mapActions('CategoriesStore', ['fetchCategories', 'fetchCourseCategories', 'fetchCourses']),
    scroll(direction) {
      const scrollAmount = 300;
      const courseScroller = this.$refs.courseScroller;

      if (direction === 'left') {
        courseScroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        courseScroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
h2 {
  font-family: 'Suisse Works', serif;
  font-weight: bold;
  font-size: 50px;
  margin-bottom: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.categories-nav {
  display: inline-flex; /* Changed to inline-flex */
  gap: 1rem;
  white-space: nowrap;
  padding-left: 15px;
  /* margin-right: 30%; */
}

.course-categories {
  display: flex;
  gap: 1rem;
  white-space: nowrap;
  padding-left: 15px;
  margin-left: 30%;
}
.category-option {
  cursor: pointer;
  padding: 0.75rem 0.4rem;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s;
  position:relative;
}

.category-option:hover {
  color: #000;
}

.category-option.active {
  color: #333;
  font-weight: bold;
  border-bottom: 2px solid #333; 
}

.categories-nav {
  display: inline-flex;
  gap: 1rem;
  white-space: nowrap;
  padding-left: 15px;
  margin-left: 25%;
}
.btn-category {
  background-color: #f1f3f4;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s, color 0.3s;
}

.btn-course-category {
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
  transition: background-color 0.3s, color 0.3s;
}

.btn-category.active,
.btn-course-category.active {
  background-color: #333;
  color: white;
}

.btn-category:hover,
.btn-course-category:hover {
  background-color: #ddd;
  color: black;
}

.course-thumbnail-wrapper {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
}

.course-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-thumbnail {
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.course-card {
  width: 280px;
  min-width: 240px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: white;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  margin: 0 1rem;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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

/* Scroller arrows */
.course-scroller-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem 0;
  max-width: 960px; /* Adjust this to ensure the width is smaller */
  margin: 0 auto;
}

.courses {
  display: flex;
  gap: 1.5rem;
  overflow-x: hidden; 
  
}

.scroll-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: black;
  color: white;
  border-radius: 50%;
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}

.left-arrow {
  left: 0;
}

.right-arrow {
  right: 0;
}

/* Responsive design */
@media (max-width: 1024px) {
  .course-card {
    width: 220px;
    min-width: 220px;
  }

  .course-scroller-container {
    max-width: 720px;
  }
  .course-categories {
  margin-left: 0%;
}
}

/* Add these mobile-specific styles to ensure horizontal scrolling on mobile */
@media (max-width: 768px) {
  .courses {
    display: flex;
    flex-wrap: nowrap; /* Ensure cards don't wrap */
    overflow-x: auto; /* Enable horizontal scrolling */
    gap: 1rem; /* Adjust gap between cards */
    padding: 0 1rem; /* Add some padding for mobile view */
    scroll-behavior: smooth;
  }

  .course-card {
    width: 85%; /* Make cards take up most of the width on mobile */
    min-width: 85%; /* Ensure they maintain that width */
    max-width: 85%; /* Prevent exceeding the width */
  }

  .scroll-arrow {
    display: none; /* Hide scroll arrows on mobile as we'll use swipe to scroll */
  }
  .course-categories {
  margin-left: 0%;
}
.categories-nav {
  margin-left: 0%;
}
}
</style>
