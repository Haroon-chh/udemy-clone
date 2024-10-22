import AuthApiServices from '@/services/AuthApiServices';

const PurchaseStore = {
  namespaced: true,
  state: {
    course: null,
    articles: [],
    isAdded: false,
    popupMessage: '',
    showSuccessPopup: false,
    showErrorPopup: false,
  },
  getters: {
    getCourse: (state) => state.course,
    getArticles: (state) => state.articles,
    isCourseAdded: (state) => state.isAdded,
    getPopupMessage: (state) => state.popupMessage,
    isSuccessPopupVisible: (state) => state.showSuccessPopup,
    isErrorPopupVisible: (state) => state.showErrorPopup,
  },
  mutations: {
    setCourse(state, course) {
      state.course = course;
    },
    setArticles(state, articles) {
      state.articles = articles;
    },
    setIsAdded(state, status) {
      state.isAdded = status;
    },
    setPopupMessage(state, message) {
      state.popupMessage = message;
    },
    showSuccessPopup(state, status) {
      state.showSuccessPopup = status;
    },
    showErrorPopup(state, status) {
      state.showErrorPopup = status;
    },
  },
  actions: {
    async fetchCourseDetails({ commit }, slug) {
      try {
        const response = await AuthApiServices.GetRequest(`/courses/${slug}`);
        commit('setCourse', response.data || {});
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    },
    async fetchArticles({ commit }, slug) {
      try {
        const response = await AuthApiServices.GetRequest(`/courses/${slug}/articles`);
        // Now access `response.data` directly because it's an array
        if (response && response.data) {
          commit('setArticles', response.data || []);
        } else {
          console.error('Invalid response structure', response);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    },
    checkIfAddedToCart({ commit }, courseId) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const isAdded = cart.some(item => item.id === courseId);
      commit('setIsAdded', isAdded);
    },
    addToCart({ commit, state }, course) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (state.isAdded) {
        commit('setPopupMessage', 'This course is already in your cart!');
        commit('showErrorPopup', true);
        setTimeout(() => commit('showErrorPopup', false), 3000);
      } else {
        cart.push(course);
        localStorage.setItem('cart', JSON.stringify(cart));
        commit('setIsAdded', true);
        commit('setPopupMessage', 'Course added to cart!');
        commit('showSuccessPopup', true);
        setTimeout(() => commit('showSuccessPopup', false), 3000);
      }
    },
  },
};

export default PurchaseStore;
