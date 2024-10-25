<template>
  <div class="dynamic-page-container">
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div v-else v-html="pageData.body"></div>

    <div v-if="offices.length" class="offices">
      <h1>Our Offices</h1>
      <div class="office-list">
        <div class="office" v-for="office in offices" :key="office.location">
          <img :src="office.image" :alt="office.location" />
          <h3>{{ office.location }}</h3>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'PageContent',
  setup() {
    const store = useStore();

    // Fetch page content on component mount
    onMounted(() => {
      store.dispatch('dynamicPage/fetchPageContent');
    });

    // Use computed properties to access Vuex store data
    const pageData = computed(() => store.getters['dynamicPage/getPageData']);
    const errorMessage = computed(() => store.getters['dynamicPage/getErrorMessage']);
    const offices = computed(() => store.getters['dynamicPage/getOffices']);

    return {
      pageData,
      errorMessage,
      offices,
    };
  },
};
</script>



<style scoped>
.dynamic-page-container {
  margin: 20px !important;
  padding: 15px !important;
}

.alert {
  margin-bottom: 20px !important;
}

.banner-container {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  margin-bottom: 30px !important;
}

.text-section h1 {
  font-size: 2rem !important;
  font-weight: bold !important;
}

.image-section img {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 10px !important;
}

.origins-section {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.contact-container h1 {
  margin-top: 40px;
}

.grid-container {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
  gap: 20px !important;
  margin-top: 20px !important;
}

.office-list {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 20px;
  margin-top: 30px;
}

.office {
  width: 300px !important;
  text-align: center;
}

.office img {
  width: 100% !important;
  height: 200px !important;
  object-fit: cover;
  border-radius: 10px !important;
}
</style>
