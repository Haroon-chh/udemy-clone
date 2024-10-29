<template>
  <div class="article-details-container">
    <h1 v-if="article">{{ article.title }}</h1>
    <div class="image-container" v-if="article && article.image_url">
      <img :src="article.image_url" alt="Article Image" />
    </div>
    <p class="article-body" v-if="article">{{ article.body }}</p>

    <transition name="fade">
      <div class="article-details" v-if="article">
        <h2>Article Details</h2>
        <ul>
          <li><i class="fas fa-book"></i><strong>Course ID:</strong> {{ article.course_id }}</li>
          <li><i :class="statusIconClass(article.status)"></i><strong>Status:</strong> {{ article.status }}</li>
          <li><i class="fas fa-calendar-alt"></i><strong>Created At:</strong> {{ new Date(article.created_at).toLocaleString() }}</li>
        </ul>
      </div>
    </transition>

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

            <button @click="toggleReplyForm(comment.id)" class="reply-button">
              {{ showReplyForm === comment.id ? 'Hide Reply' : 'Reply' }}
            </button>

            <div v-if="showReplyForm === comment.id" class="reply-form">
              <textarea v-model="newReply" placeholder="Write a reply..." class="reply-input"></textarea>
              <button @click="submitReply(comment.id)" class="reply-submit-button">Post Reply</button>
            </div>
          </div>
        </div>

        <!-- Replies Section -->
        <div class="replies" v-if="comment.replies && comment.replies.length">
  <div
    v-for="reply in comment.replies.slice(0, replyLimit[comment.id] || 3)"
    :key="reply.id"
    class="reply-item"
  >
    <div class="user-avatar">
      <img :src="getUserAvatar(reply.user_id)" alt="User Avatar" />
    </div>
    <div class="reply-content">
      <strong>{{ reply.user_id }}</strong>
      <p>{{ reply.body }}</p>
      <small>{{ new Date(reply.created_at).toLocaleString() }}</small>
    </div>
  </div>

  <button
    v-if="comment.replies.length > (replyLimit[comment.id] || 3)"
    @click="loadMoreReplies(comment.id)"
    class="view-more-replies-button"
  >
    View More Replies
  </button>

  <button
    v-if="(replyLimit[comment.id] || 3) > 3"
    @click="hideReplies(comment.id)"
    class="hide-replies-button"
  >
    Hide Replies
  </button>
</div>

      </div>

      <button v-if="comments.length > visibleCommentsLimit" @click="viewMoreComments" class="view-more-button">
        View More Comments
      </button>
    </div>
    <p v-else-if="showComments && !comments.length">No comments yet.</p>

    <div class="comment-form">
      <textarea v-model="newComment" placeholder="Write a comment..." class="comment-input"></textarea>
      <button @click="submitComment" class="comment-button">Post Comment</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AuthApiServices from '@/services/AuthApiServices';

export default {
  name: 'ArticleDetails',
  setup() {
    const store = useStore();
    const article = ref({});
    const comments = ref([]);
    const visibleCommentsLimit = ref(5);
    const newComment = ref('');
    const newReply = ref('');
    const showReplyForm = ref(null);
    const replyLimit = ref({});
    const showComments = ref(false);
    const route = useRoute();
    const slug = route.params.slug;

    const fetchArticleDetails = async () => {
      try {
        const response = await AuthApiServices.GetRequest(`/articles/${slug}`);
        if (response.data && response.data.article) {
          article.value = response.data.article;
          fetchComments();
        }
      } catch (error) {
        console.error('Error fetching article details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        await store.dispatch('CommentStore/fetchComments', slug);
        comments.value = store.state.CommentStore.comments;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const submitComment = async () => {
      if (!newComment.value.trim()) {
        console.error('Cannot post an empty comment');
        return;
      }

      const payload = { body: newComment.value };
      try {
        await store.dispatch('CommentStore/postComment', { slug, commentData: payload });
        newComment.value = '';
        fetchComments();
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    };

    const toggleComments = () => {
      showComments.value = !showComments.value;
    };

    const toggleReplyForm = (commentId) => {
      showReplyForm.value = showReplyForm.value === commentId ? null : commentId;
    };

    const submitReply = async (parentCommentId) => {
      if (!newReply.value.trim()) {
        console.error('Cannot post an empty reply');
        return;
      }

      const payload = { body: newReply.value, parent_comment_id: parentCommentId };
      try {
        await store.dispatch('CommentStore/postReply', { slug, payload });
        newReply.value = '';
        showReplyForm.value = null;
        fetchComments();
      } catch (error) {
        console.error('Error posting reply:', error);
      }
    };

    const viewMoreComments = () => {
      visibleCommentsLimit.value += 5;
    };

    const loadMoreReplies = (commentId) => {
      replyLimit.value[commentId] = (replyLimit.value[commentId] || 3) + 3;
    };

    const hideReplies = (commentId) => {
      replyLimit.value[commentId] = 3;
    };

    const visibleComments = computed(() => {
      return comments.value.slice(0, visibleCommentsLimit.value);
    });

    const getUserAvatar = (userId) => `https://ui-avatars.com/api/?name=User+${userId}`;
    const statusIconClass = (status) => (status === 'published' ? 'fas fa-check-circle status-success' : 'fas fa-times-circle status-failed');

    onMounted(() => {
      fetchArticleDetails();
    });

    return {
      article,
      comments,
      newComment,
      newReply,
      visibleCommentsLimit,
      showReplyForm,
      showComments,
      visibleComments,
      submitComment,
      toggleComments,
      viewMoreComments,
      getUserAvatar,
      statusIconClass,
      toggleReplyForm,
      submitReply,
      loadMoreReplies,
      hideReplies,
      replyLimit,
    };
  },
};
</script>

<style scoped>
/* Existing and updated styles */
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

.show-comments-button, .view-more-replies-button, .hide-replies-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.show-comments-button:hover, .view-more-replies-button:hover, .hide-replies-button:hover {
  background-color: #1d4ed8;
}

.comments-section {
  margin-top: 2rem;
}

.comment-item {
  display: flex;
  flex-direction: column;
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

.comment-content, .reply-content {
  background-color: #f1f1f1;
  border-radius: 12px;
  padding: 10px 15px;
  max-width: 100%;
  word-wrap: break-word;
  font-size: 0.95rem;
  color: #333;
}

.comment-content p, .reply-content p {
  margin: 0;
}

.reply-button, .reply-submit-button {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.reply-button:hover, .reply-submit-button:hover {
  background-color: #1d4ed8;
}

.replies {
  margin-left: 2rem;
  border-left: 2px solid #ddd;
  padding-left: 1rem;
  margin-top: 1rem;
}

.reply-item {
  display: flex;
  margin-bottom: 1rem;
}

.comment-form, .reply-form {
  margin-top: 1.5rem;
}

.comment-input, .reply-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  resize: none;
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

@media (max-width: 600px) {
  .article-details-container {
    padding: 1rem;
  }
  h1 {
    font-size: 1.5rem;
  }
  .article-body, .comment-content, .reply-content {
    font-size: 0.9rem;
  }
  .comment-input, .reply-input {
    font-size: 0.9rem;
  }
}
</style>
