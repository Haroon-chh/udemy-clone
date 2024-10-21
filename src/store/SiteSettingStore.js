import AuthApiServices from '@/services/AuthApiServices';

const SiteSettingStore = {
  namespaced: true,
  state: {
    siteSettings: {
      siteTitle: '',
      logoPath: '',
      copyright: ''
    },
  },
  mutations: {
    setSiteSettings(state, settings) {
      state.siteSettings = settings;
    },
  },
  actions: {
    async createSiteSetting({ commit }, payload) {
      try {
        const response = await AuthApiServices.PostRequest('/create-site-setting', payload);
        commit('setSiteSettings', response.data);
        return response;
      } catch (error) {
        console.error('Error creating site settings:', error);
        throw error;
      }
    },
  },
  getters: {
    getSiteSettings(state) {
      return state.siteSettings;
    },
  },
};

export default SiteSettingStore;
