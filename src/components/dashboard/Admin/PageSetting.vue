<template>
    <div class="d-flex">
      <!-- Side Panel -->
      <div class="side-panel p-3">
        <div class="btn-group-vertical w-100">
          <router-link
            v-for="(page, index) in pages"
            :key="index"
            :to="{ name: 'PageEditor', params: { slug: page.slug } }" 
            class="btn category-btn my-2 w-100"
          >
            {{ page.title }}
          </router-link>
        </div>
      </div>
  
      <!-- Main Content Area -->
      <div class="content flex-grow-1 p-3">
        <router-view/>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'SidePanelComponent',
    computed: {
      ...mapState('PageSettingsStore', ['pages']),
    },
    methods: {
      fetchPages() {
        this.$store.dispatch('PageSettingsStore/getPages');
      },
    },
    mounted() {
      this.fetchPages();
    },
  };
  </script>
  
  <style scoped>
  .side-panel {
    width: 300px;
    height: 100vh;
    background-color: rgb(35, 35, 35);
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* Firefox-specific */
    scrollbar-color: #ddd #5a2ee3;
  }
  
  /* Custom scroll styling for WebKit browsers */
  .side-panel::-webkit-scrollbar {
    width: 8px;
  }
  .side-panel::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
  .side-panel::-webkit-scrollbar-track {
    background-color: #5a2ee3;
    border-radius: 10px;
  }
  
  /* Category Button Styles */
  .category-btn {
    background-color:#A435F0;
    color: white;
    border: 2px solid white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 500;
  }
  
  .category-btn:hover {
    background-color: #483dbb;
    border-color: #ddd;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  /* Main Content Area Styles */
  .content {
    background-color: #f8f9fa;
  }
  </style>
  