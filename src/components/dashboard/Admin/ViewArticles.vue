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
          <button class="btn btn-primary" @click="openModal(article.id)">Update</button>
          <router-link :to="'/articles/' + article.slug" class="read-more">Read more</router-link>
        </div>
      </div>
    </div>

    <!-- Bootstrap Modal -->
    <div class="modal fade" id="articleModal" tabindex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="articleModalLabel">Update Article</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateArticle">
              <div class="form-group">
                <label for="article-title">Title</label>
                <input type="text" v-model="modalArticle.title" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="article-body">Body</label>
                <textarea v-model="modalArticle.body" class="form-control" rows="4" required></textarea>
              </div>
              <div class="form-group">
                <label for="course-id">Course ID</label>
                <input type="number" v-model="modalArticle.course_id" class="form-control" required />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-success" @click="updateArticle">Update</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'bootstrap'; // Explicit import

export default {
  name: 'ViewArticles',
  setup() {
    const store = useStore();
    const articles = computed(() => store.getters['AdminStore/allArticles']);
    const modalArticle = ref({ title: '', body: '', id: null, course_id: null });

    const truncateText = (text, length = 150) => {
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    // Fetch all articles
    onMounted(async () => {
      try {
        await store.dispatch('AdminStore/fetchArticles');
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    });

    // Function to open modal and load article details
    const openModal = async (articleId) => {
  try {
    const article = await store.dispatch('AdminStore/fetchArticleById', articleId);
    modalArticle.value = { 
      title: article.title, 
      body: article.body, 
      id: article.id, 
      course_id: article.course_id 
    };
    const modal = new Modal(document.getElementById('articleModal'));
    modal.show();
  } catch (error) {
    console.error('Error loading article:', error);
  }
};


    // Function to update the article
    const updateArticle = async () => {
      try {
        await store.dispatch('AdminStore/updateArticle', modalArticle.value);
        const modal = Modal.getInstance(document.getElementById('articleModal'));
        modal.hide();
        await store.dispatch('AdminStore/fetchArticles'); // Refresh the list after updating
      } catch (error) {
        console.error('Error updating article:', error);
      }
    };

    return {
      articles,
      modalArticle,
      openModal,
      updateArticle,
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
.read-more {
  font-size: 1rem;
  color: #1e40af;
  font-weight: bold;
  text-decoration: none;
  align-self: flex-start;
}
</style>
