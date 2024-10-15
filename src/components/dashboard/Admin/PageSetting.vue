<template>
    <div class="d-flex">
      <!-- Side Panel -->
      <div class="side-panel p-3">
        <div class="btn-group-vertical w-100">
          <button
            v-for="(page, index) in pages"
            :key="index"
            class="btn category-btn my-2 w-100"
          >
            {{ page.title }}
          </button>
        </div>
      </div>
  
      <!-- Main Content Area -->
      <div class="content flex-grow-1 p-3">
        <h4>Main Content Area</h4>
        <p>You can place your main content here.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'SidePanelComponent',
    computed: {
      // Properly map 'pages' from the namespaced store
      ...mapState('PageSettingsStore', ['pages']),
    },
    methods: {
      // Dispatch the action to fetch pages
      fetchPages() {
        this.$store.dispatch('PageSettingsStore/getPages');
      },
    },
    mounted() {
      // Use mounted() to trigger the fetch
      this.fetchPages();
    },
  };
  </script>
  
  <style scoped>
  .side-panel {
    width: 300px;
    height: 100vh;
    background-color: #5a2ee3;
  }
  
  .category-btn {
    background-color: #5a2ee3;
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
  
  .content {
    background-color: #f8f9fa;
  }
  </style>
  