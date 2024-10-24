import AuthApiServices from '@/services/AuthApiServices'; // Adjust the path as needed

const state = {
  pageData: {},
  errorMessage: '',
  offices: [
    {
      location: 'San Francisco, CA',
      image: 'https://about.udemy.com/wp-content/uploads/2021/07/dublin-1-460x350.jpeg',
    },
    {
      location: 'Denver, CO',
      image: 'https://about.udemy.com/wp-content/uploads/2021/07/denver-460x350.jpeg',
    },
    {
      location: 'Dublin, Ireland',
      image: 'https://about.udemy.com/wp-content/uploads/2021/07/san-francisco-460x350.jpeg',
    },
    {
      location: 'Ankara, Türkiye',
      image: 'https://about.udemy.com/wp-content/uploads/2021/07/ankara-1-450x350.jpeg',
    },
    {
      location: 'Austin, TX',
      image: 'https://about.udemy.com/wp-content/uploads/2023/04/Austin-480x350.png',
    },
    {
      location: 'Melbourne, Australia',
      image: 'https://about.udemy.com/wp-content/uploads/2023/04/Melbourne-480x350.png',
    },
  ],
};

const mutations = {
  SET_PAGE_DATA(state, payload) {
    state.pageData = payload;
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  },
};

const actions = {
    async fetchPageContent({ commit }, slug = 'contact-us') {
      try {
        const response = await AuthApiServices.GetRequest(`/get-page-by-slug/${slug}`);
        console.log('API response:', response); // Check if the API is returning the expected data
        if (response && response.data) {
          const body = response.data.body.replace(
            '@/assets/contactperson.png',
            require('@/assets/contactperson.png')
          );
          commit('SET_PAGE_DATA', { ...response.data, body });
        } else {
          throw new Error(response.message || 'Failed to fetch page content.');
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
        commit('SET_ERROR_MESSAGE', error.message);
      }
    },
  };
  

const getters = {
  getPageData: (state) => state.pageData,
  getErrorMessage: (state) => state.errorMessage,
  getOffices: (state) => state.offices,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
