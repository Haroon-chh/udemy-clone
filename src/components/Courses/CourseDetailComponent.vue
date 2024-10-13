<template>
  <div class="course-details-container">
    <div class="course-card">
      <div class="image-container">
        <img class="course-thumbnail" :src="course.thumbnail_url" alt="Course Thumbnail" />
      </div>
      <div class="content">
        <h1 class="course-title">{{ course.title }}</h1>
        <p class="course-description">{{ course.description }}</p>
        <ul class="course-features">
          <li v-for="(item, index) in course.short_description" :key="index">
            <i class="feature-icon"></i> {{ item }}
          </li>
        </ul>
        <div class="course-pricing">
          <p class="price">
            <span class="original-price">${{ course.price }}</span>
            <span class="discounted-price">${{ course.discounted_price }}</span>
          </p>
          <p class="duration">
            <i class="fas fa-clock duration-icon"></i> {{ course.duration }} hours
          </p>
        </div>
        <button class="enroll-button">Enroll Now</button>
      </div>
    </div>
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background: linear-gradient(135deg, #f3f4f6, #e0e7ff);
  min-height: 100vh;
}

.course-card {
  display: flex;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
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
  height: 100%;
  object-fit: cover;
}

.content {
  flex: 2;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.course-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
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
  font-size: 0.95rem;
  color: #374151;
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
  font-size: 1.2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
  margin-right: 0.5rem;
}

.discounted-price {
  color: #ef4444;
  font-weight: bold;
  font-size: 1.4rem;
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
</style>
