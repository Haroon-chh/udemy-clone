<template>
  <div class="admin-card-container">
    <div class="admin-cards-wrapper">
      <template v-for="(card, index) in cards" :key="index">
        <router-link v-if="card.link" :to="card.link" class="admin-card">
          <div class="admin-card-content">
            <div class="admin-card-icon" :style="{ backgroundColor: card.color }">
              <i :class="card.icon"></i>
            </div>
            <h3 class="admin-card-title">{{ card.title }}</h3>
            <p class="admin-card-description">{{ card.description }}</p>
          </div>
        </router-link>
        <div v-else class="admin-card">
          <div class="admin-card-content">
            <div class="admin-card-icon" :style="{ backgroundColor: card.color }">
              <i :class="card.icon"></i>
            </div>
            <h3 class="admin-card-title">{{ card.title }}</h3>
            <p class="admin-card-description">{{ card.description }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CardContainer',
  setup() {
    const cards = ref([
      { id: 1, title: 'Add Articles', description: 'Create and publish new articles.', icon: 'fas fa-file-alt', color: '#4caf50', link: { name: 'add-article' } },
      { id: 2, title: 'View Articles', description: 'Browse and manage all published articles.', icon: 'fas fa-book-open', color: '#2196f3', link: { name: 'view-articles' } },
      { id: 3, title: 'Analytics', description: 'View site analytics, user trends.', icon: 'fas fa-chart-line', color: '#ff9800', link: null },
      { id: 4, title: 'Page Settings', description: 'Configure site settings and preferences.', icon: 'fas fa-cogs', color: '#9c27b0', link: { name: 'PageSettings' } },
      { id: 5, title: 'Site Settings', description: 'Update site title, logo, and copyright.', icon: 'fas fa-cog', color: '#f44336', link: { name: 'SiteSettings' } },
      { id: 6, title: 'Active Subscriptions', description: 'Check active subscriptions.', icon: 'fas fa-plus', color: '#337939', link: { name: 'active-subscriptions' } },
    ]);

    return { cards };
  },
};
</script>

<style scoped>
/* Admin Card Container Styles */
.admin-card-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.admin-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  justify-content: center;
}

/* Individual Card Styling */
.admin-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
}

/* Hover Effects (Not for Mobile) */
@media (min-width: 768px) {
  .admin-card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    background-color: #f9f9f9;
  }

  .admin-card:hover .admin-card-icon {
    transform: rotate(360deg) scale(1.5);
    background-color: rgba(0, 0, 0, 0.05);
  }

  .admin-card-title,
  .admin-card-description {
    opacity: 1;
    transition: opacity 0.6s ease-in-out;
  }

  .admin-card:hover .admin-card-title,
  .admin-card:hover .admin-card-description {
    opacity: 0.2;
  }

  .admin-card:hover .admin-card-title,
  .admin-card:hover .admin-card-description {
    opacity: 1;
    transition: opacity 0.6s ease-in-out 0.3s; /* Delay reappearance */
  }
}

/* Card Content */
.admin-card-content {
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Card Icon */
.admin-card-icon {
  border-radius: 50%;
  padding: 20px;
  margin-bottom: 20px;
  color: #ffffff;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.6s ease, background-color 0.3s ease;
}

/* Card Titles */
.admin-card-title {
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
}

/* Card Description */
.admin-card-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .admin-cards-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
