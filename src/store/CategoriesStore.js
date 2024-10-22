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
      console.log('Mutation setCategories:', categories); // Log the mutation
      state.categories = categories;
    },
    setCourseCategories(state, courseCategories) {
      console.log('Mutation setCourseCategories:', courseCategories); // Log the mutation
      state.courseCategories = courseCategories;
    },
    setCourses(state, courses) {
      console.log('Mutation setCourses:', courses); // Log the mutation
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
          console.log('Fetching course categories for first category');
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

        if (response?.data.course_categories && response?.data.course_categories.length > 0) {
          console.log('Fetching courses for first course category');
          this.dispatch('CategoriesStore/fetchCourses', response.data.course_categories[0].id);
        } else {
          commit('setCourses', []);  // Clear courses if no course categories exist
        }
      } catch (error) {
        console.error(`Error fetching course categories for category ID ${categoryId}:`, error);
        commit('setCourseCategories', []);
        commit('setCourses', []);  // Clear courses if an error occurs
      }
    },

    async fetchCourses({ commit }, courseCategoryId) {
      try {
        console.log(`Fetching courses for course category ID ${courseCategoryId}`);  // Log course category ID
        const response = await AuthApiServices.GetRequest(`/course-categories/${courseCategoryId}/course`);
        console.log(`Courses for course category ID ${courseCategoryId}:`, response?.data);  // Log fetched courses
        commit('setSelectedCourseCategoryId', courseCategoryId);
        
        // Check if the response contains the 'data' key
        const courses = response?.data || []; 
        console.log('Fetched courses:', courses); // Log the fetched courses
       
        commit('setCourses', courses); // Set courses to the state
      } catch (error) {
        console.error(`Error fetching courses for course category ID ${courseCategoryId}:`, error);
        commit('setCourses', []);  // Clear courses if an error occurs
      }
    },
  },
};
