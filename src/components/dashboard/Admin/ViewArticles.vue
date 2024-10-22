<template>
    <div class="articles-container">
      <h2 class="articles-title">Published Articles</h2>
  
      <div v-if="articles.length === 0" class="no-articles">
        <p>No articles found.</p>
      </div>
  
      <div v-else class="articles-list">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <img :src="article.image_url" alt="Article Image" class="article-image" />
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-body" v-html="truncateText(article.body)"></p>
            <router-link :to="'/articles/' + article.slug" class="read-more">Read more</router-link>
          </div>
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
  
      const articles = computed(() => store.getters['AdminStore/allArticles']);
  
      const truncateText = (text, length = 150) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
      };
  
      onMounted(async () => {
        try {
          await store.dispatch('AdminStore/fetchArticles');
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      });
  
      return {
        articles,
        truncateText,
      };
    },
  };
  </script>
  
  <style scoped>
  .articles-container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .articles-title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    color: #1e3a8a;
  }
  
  .no-articles {
    text-align: center;
    font-size: 1.2rem;
    color: #6c757d;
    margin-top: 20px;
  }
  
  .articles-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }
  
  .article-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: calc(33.333% - 20px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .article-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .article-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: 2px solid #1e3a8a;
  }
  
  .article-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
  
  .article-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #333;
    font-weight: bold;
  }
  
  .article-body {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .read-more {
    font-size: 1rem;
    color: #1e40af;
    font-weight: bold;
    text-decoration: none;
    align-self: flex-start;
    margin-top: auto;
    transition: color 0.3s ease;
  }
  
  .read-more:hover {
    color: #2563eb;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .articles-list {
      flex-direction: column;
      gap: 20px;
    }
  
    .article-card {
      width: 100%;
    }
  }
  </style>