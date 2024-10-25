<template>
  <div class="article-details-container">
    <!-- Display article title -->
    <h1 v-if="article">{{ article.title }}</h1>

    <!-- Display article image if available -->
    <div class="image-container" v-if="article && article.image_url">
      <img :src="article.image_url" alt="Article Image" />
    </div>

    <!-- Display article body -->
    <p class="article-body" v-if="article">{{ article.body }}</p>

    <!-- Display additional article details -->
    <transition name="fade">
      <div class="article-details" v-if="article">
        <h2>Article Details</h2>
        <ul>
          <li>
            <i class="fas fa-book"></i>
            <strong>Course ID:</strong> {{ article.course_id }}
          </li>
          <li>
            <i :class="statusIconClass(article.status)"></i>
            <strong>Status:</strong> {{ article.status }}
          </li>
          <li>
            <i class="fas fa-calendar-alt"></i>
            <strong>Created At:</strong> {{ new Date(article.created_at).toLocaleString() }}
          </li>
        </ul>
      </div>
    </transition>

    <!-- Show Comments Button -->
    <button @click="toggleComments" class="show-comments-button">
      {{ showComments ? 'Hide Comments' : 'Show Comments' }}
    </button>

    <!-- Comments Section -->
    <div class="comments-section" v-if="showComments && comments.length">
      <h2>Comments</h2>
      <div v-for="comment in visibleComments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <div class="user-avatar">
            <img :src="getUserAvatar(comment.user_id)" alt="User Avatar" />
          </div>
          <div class="comment-content">
            <strong>{{ comment.user_id }}</strong>
            <p>{{ comment.body }}</p>
            <small>{{ new Date(comment.created_at).toLocaleString() }}</small>
          </div>
        </div>
      </div>

      <!-- View More Comments Button -->
      <button v-if="comments.length > visibleCommentsLimit" @click="viewMoreComments" class="view-more-button">
        View More Comments
      </button>
    </div>
    <p v-else-if="showComments && !comments.length">No comments yet.</p>

    <!-- Comment form -->
    <div class="comment-form">
      <textarea v-model="newComment" placeholder="Write a comment..." class="comment-input"></textarea>
      <button @click="submitComment" class="comment-button">Post Comment</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'; // Import computed here
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices';

export default {
  name: 'ArticleDetails',
  setup() {
    const store = useStore();
    const article = ref({});
    const comments = ref([]);
    const visibleCommentsLimit = ref(5); // Limit to show 5 comments initially
    const newComment = ref('');
    const showComments = ref(false); // Toggle comments visibility
    const route = useRoute();
    const slug = route.params.slug;

    // Fetch article details
    const fetchArticleDetails = async () => {
      try {
        const response = await AuthApiServices.GetRequest(`/articles/${slug}`);
        if (response.data && response.data.article) {
          article.value = response.data.article;
          fetchComments(); // Fetch comments after getting the article details
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };

    // Fetch comments
    const fetchComments = async () => {
      try {
        await store.dispatch('CommentStore/fetchComments', slug);
        if (store.state.CommentStore.comments) {
          comments.value = store.state.CommentStore.comments;
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    // Submit a new comment
    const submitComment = async () => {
      if (!newComment.value.trim()) {
        console.error('Cannot post an empty comment');
        return;
      }

      const payload = { body: newComment.value };

      try {
        await store.dispatch('CommentStore/postComment', { slug, commentData: payload });
        newComment.value = ''; // Reset comment input
        fetchComments(); // Refresh comments after posting
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };

    // Toggle comments section visibility
    const toggleComments = () => {
      showComments.value = !showComments.value;
    };

    // Show more comments when the button is clicked
    const viewMoreComments = () => {
      visibleCommentsLimit.value += 5; // Show 5 more comments each time
    };

    // Return visible comments based on the limit
    const visibleComments = computed(() => {
      return comments.value.slice(0, visibleCommentsLimit.value);
    });

    const getUserAvatar = (userId) => {
      return `https://ui-avatars.com/api/?name=User+${userId}`;
    };

    // Get status icon based on the article status
    const statusIconClass = (status) => {
      return status === 'published'
        ? 'fas fa-check-circle status-success'
        : 'fas fa-times-circle status-failed';
    };

    onMounted(() => {
      fetchArticleDetails();
    });

    return {
      article,
      comments,
      newComment,
      visibleCommentsLimit,
      showComments,
      visibleComments,
      submitComment,
      toggleComments,
      viewMoreComments,
      getUserAvatar,
      statusIconClass,
    };
  },
};
</script>

<style scoped>
/* All the styles you previously had, along with the styles for comments and replies */
.article-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Show Comments Button */
.show-comments-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.show-comments-button:hover {
  background-color: #1d4ed8;
}

/* Comments Section */
.comments-section {
  margin-top: 2rem;
}

.comment-item {
  display: flex;
  margin-bottom: 1.5rem;
}

.comment-header {
  display: flex;
  align-items: flex-start;
}

.user-avatar {
  margin-right: 10px;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.comment-content {
  background-color: #f1f1f1;
  border-radius: 12px;
  padding: 10px 15px;
  max-width: 100%;
  word-wrap: break-word;
}

.comment-content p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.comment-content small {
  font-size: 0.8rem;
  color: #888;
}

/* View More Button */
.view-more-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-more-button:hover {
  background-color: #1d4ed8;
}

/* Comment form */
.comment-form {
  margin-top: 2rem;
}

.comment-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid #ccc;
}

.comment-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
}

.comment-button:hover {
  background-color: #1d4ed8;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .article-details-container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .article-body {
    font-size: 1rem;
  }

  .comment-content {
    padding: 8px 12px;
  }

  .comment-input {
    font-size: 0.9rem;
  }

  .comment-button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
</style>
