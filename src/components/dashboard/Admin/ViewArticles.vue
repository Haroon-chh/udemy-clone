<!-- src/components/dashboard/Admin/ViewArticles.vue -->
<template>
    <div class="articles-container">
      <h2>Published Articles</h2>
  
      <div v-if="articles.length === 0" class="no-articles">
        <p>No articles found.</p>
      </div>
  
      <div v-else class="articles-list">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <img :src="article.image_url" alt="Article Image" class="article-image">
          <h3>{{ article.title }}</h3>
          <p v-html="article.body"></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ViewArticles',
    setup() {
      const store = useStore();
      
      const articles = computed(() => store.getters['admin/allArticles']);
  
      onMounted(async () => {
        await store.dispatch('admin/fetchArticles');  // Fetch articles when the component mounts
      });
  
      return {
        articles,
      };
    },
  };
  </script>
  
  <style scoped>
  .articles-container {
    padding: 20px;
  }
  
  .no-articles {
    text-align: center;
    font-size: 18px;
  }
  
  .articles-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .article-card {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
  }
  
  .article-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .article-card h3 {
    margin: 15px 0 10px;
  }
  
  .article-card p {
    color: #555;
  }
  </style>
  