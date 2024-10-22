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
import { ref, onMounted, nextTick } from 'vue';
import AuthApiServices from '@/services/AuthApiServices'; // Adjust the path as needed

export default {
  name: 'PageContent',
  setup() {
    const pageData = ref({});
    const errorMessage = ref('');
    const offices = ref([]);
    const slug = 'contact-with-us'; // Hardcoded slug

    const fetchPageContent = async () => {
  try {
    const response = await AuthApiServices.GetRequest(`/get-page-by-slug/${slug}`);
    if (response && response.data) {
      // Replace the image path dynamically
      pageData.value.body = response.data.body.replace(
        '@/assets/contactperson.png',
        require('@/assets/contactperson.png')
      );
      await nextTick(); // Ensure DOM updates
    } else {
      throw new Error(response.message || 'Failed to fetch page content.');
    }
  } catch (error) {
    console.error('Error fetching page content:', error);
    errorMessage.value = error.message;
  }
};


    // Office data array
    offices.value = [
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
    ];

    onMounted(fetchPageContent);

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
