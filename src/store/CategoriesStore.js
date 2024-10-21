import AuthApiServices from '@/services/AuthApiServices';

export default {
  namespaced: true,
  state: {
    categories: [],
    courseCategories: [],
    courses: [],
    selectedCategoryId: null,
    selectedCourseCategoryId: null,
  },
  getters: {
    getCategories: (state) => state.categories,
    getCourseCategories: (state) => state.courseCategories,
    getCourses: (state) => state.courses,
    getSelectedCategoryId: (state) => state.selectedCategoryId,
    getSelectedCourseCategoryId: (state) => state.selectedCourseCategoryId,
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setCourseCategories(state, courseCategories) {
      state.courseCategories = courseCategories;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
    setSelectedCategoryId(state, categoryId) {
      state.selectedCategoryId = categoryId;
    },
    setSelectedCourseCategoryId(state, courseCategoryId) {
      state.selectedCourseCategoryId = courseCategoryId;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await AuthApiServices.GetRequest('/categories');
        console.log('Categories data:', response?.data);  // Log fetched categories data
        commit('setCategories', response?.data || []);
        
        if (response?.data.length > 0) {
          this.dispatch('CategoriesStore/fetchCourseCategories', response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },

    async fetchCourseCategories({ commit }, categoryId) {
      try {
        const response = await AuthApiServices.GetRequest(`/categories/${categoryId}/course-categories`);
        console.log(`Course categories for category ID ${categoryId}:`, response?.data);  // Log fetched course categories
        commit('setSelectedCategoryId', categoryId);
        commit('setCourseCategories', response?.data || []);

        if (response?.data.length > 0) {
          this.dispatch('CategoriesStore/fetchCourses', response.data[0].id);
        } else {
          commit('setCourses', []);  // Clear courses if no course categories exist
        }
      } catch (error) {
        console.error(`Error fetching course categories for category ID ${categoryId}:`, error);
        commit('setCourseCategories', []);
        commit('setCourses', []);
      }
    },

    async fetchCourses({ commit }, courseCategoryId) {
      try {
        const response = await AuthApiServices.GetRequest(`/course-categories/${courseCategoryId}/course`);
        console.log(`Courses for course category ID ${courseCategoryId}:`, response?.data);  // Log fetched courses
        commit('setSelectedCourseCategoryId', courseCategoryId);
        commit('setCourses', response?.data || []);
      } catch (error) {
        console.error(`Error fetching courses for course category ID ${courseCategoryId}:`, error);
        commit('setCourses', []);
      }
    },
  },
};
