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
    async updateSiteSetting({ commit }, updatedFields) {
      try {
        const formData = new FormData();

        // Add only the updated fields to the formData
        if (updatedFields.site_title) formData.append('site_title', updatedFields.site_title);
        if (updatedFields.logo_path) formData.append('logo_path', updatedFields.logo_path); // Ensure a file exists before appending
        if (updatedFields.copyright) formData.append('copyright', updatedFields.copyright);

        // Log the FormData contents
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        const response = await AuthApiServices.PostRequest('/update-site-setting', formData);
        console.log(updatedFields);
        commit('setSiteSettings', response.data);
        return response;
      } catch (error) {
        // Log the full error response from the backend
        console.error('Error updating site settings:', error.response?.data || error.message);
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
