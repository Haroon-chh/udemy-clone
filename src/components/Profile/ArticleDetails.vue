<template>
  <div class="article-details-container">
    <h1 v-if="article">{{ article.title }}</h1>
<<<<<<< HEAD
    <div class="image-container" v-if="article && article.image_url">
      <img :src="article.image_url" alt="Article Image" />
=======

    <!-- Display article image if available -->
    <div class="image-container" v-if="course && course.thumbnail">
      <img class="course-thumbnail" :src="course.thumbnail" alt="Article Image" />
>>>>>>> development
    </div>
    <p class="article-body" v-if="article">{{ article.body }}</p>

    <transition name="fade">
      <div class="article-details" v-if="article">
        <h2>Article Details</h2>
<<<<<<< HEAD
        <ul>
          <li><i class="fas fa-book"></i><strong>Course ID:</strong> {{ article.course_id }}</li>
          <li><i :class="statusIconClass(article.status)"></i><strong>Status:</strong> {{ article.status }}</li>
          <li><i class="fas fa-calendar-alt"></i><strong>Created At:</strong> {{ new Date(article.created_at).toLocaleDateString() }}</li>
=======
        <ul class="list-unstyled">
          <li>
            <i class="fas fa-book" style="color: blue;"></i>
            <strong> Course ID:</strong> {{ article.course_id }}
          </li>
         <li>
         <i v-if="article.status === 'published'" class="fas fa-check-circle status-success"></i>
         <strong> Status:</strong> {{ article.status }}
         </li>


          <li>
            <i class="fas fa-calendar-alt" style="color: blue;"></i>
            <strong> Created At:</strong> {{ new Date(article.created_at).toLocaleString() }}
          </li>
>>>>>>> development
        </ul>
      </div>
    </transition>

    <button @click="toggleComments" class="toggle-comments-button">
      {{ showComments ? 'Hide Comments' : 'View Comments' }}
    </button>

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
            <small>{{ new Date(comment.created_at).toLocaleTimeString() }}</small>

            <span @click="toggleReplyForm(comment.id)" class="reply-link">Reply</span>

            <div v-if="showReplyForm === comment.id" class="reply-form">
              <textarea v-model="newReply" placeholder="Write a reply..." class="reply-input"></textarea>
              <button @click="submitReply(comment.id)" class="reply-submit-button">Post Reply</button>
            </div>
          </div>
        </div>

        <div v-if="comment.replies && comment.replies.length" class="replies">
          <div v-for="reply in limitedReplies(comment.replies)" :key="reply.id" class="reply-item">
            <div class="user-avatar">
              <img :src="getUserAvatar(reply.user_id)" alt="User Avatar" />
            </div>
            <div class="reply-content">
              <strong>{{ reply.user_id }}</strong>
              <p>{{ reply.body }}</p>
              <small>{{ new Date(reply.created_at).toLocaleTimeString() }}</small>
            </div>
          </div>
          <span v-if="comment.replies.length > replyLimit" @click="toggleViewMoreReplies(comment.id)" class="view-more-replies">
            {{ showAllReplies[comment.id] ? 'Hide Replies' : 'View More Replies' }}
          </span>
        </div>
      </div>
      <span v-if="comments.length > visibleCommentsLimit" @click="viewMoreComments" class="view-more-comments">
        View More Comments
      </span>
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
import AuthApiServices from '@/services/AuthApiServices.js';

export default {
  name: 'ArticleDetails',
  setup() {
    const course = computed(() => store.getters['PurchaseStore/getCourse']);
    // const articles = computed(() => store.getters['PurchaseStore/getArticles']);
    const store = useStore();
    const article = ref({});
    const comments = ref([]);
    const visibleCommentsLimit = ref(5);
    const replyLimit = 3;
    const newComment = ref('');
    const newReply = ref('');
    const showReplyForm = ref(null);
    const showComments = ref(false);
    const showAllReplies = ref({});
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
        comments.value = store.state.CommentStore.comments; // Load organized comments from Vuex state
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
      if (!parentCommentId) {
        console.error('Parent comment ID is missing');
        return;
      }

      if (!newReply.value.trim()) {
        console.error('Cannot post an empty reply');
        return;
      }

      const replyData = { body: newReply.value };
      try {
        await store.dispatch('CommentStore/postReply', { slug, parentCommentId, replyData });
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

    const toggleViewMoreReplies = (commentId) => {
      showAllReplies.value[commentId] = !showAllReplies.value[commentId];
    };

    const limitedReplies = (replies) => {
      return showAllReplies.value[replies[0]?.parent_comment_id] ? replies : replies.slice(0, replyLimit);
    };

    const visibleComments = computed(() => {
      return comments.value.slice(0, visibleCommentsLimit.value);
    });

<<<<<<< HEAD
    const getUserAvatar = (userId) => `https://ui-avatars.com/api/?name=User+${userId}`;
    const statusIconClass = (status) => status === 'published' ? 'fas fa-check-circle status-success' : 'fas fa-times-circle status-failed';
=======
    const getUserAvatar = (userId) => {
      return `https://ui-avatars.com/api/?name=User+${userId}`;
    };

    // Get status icon based on the article status


>>>>>>> development

    onMounted(() => {
      fetchArticleDetails();
    });

    onMounted(() => {
      store.dispatch('PurchaseStore/fetchCourseDetails', slug).then(() => {
        // Only attempt to check the cart if course data is available
        if (course.value && course.value.id) {
          store.dispatch('PurchaseStore/checkIfAddedToCart', course.value.id);
        }
      });
      store.dispatch('PurchaseStore/fetchArticles', slug);
    });

    return {
      course,
      article,
      comments,
      newComment,
      newReply,
      visibleCommentsLimit,
      showReplyForm,
      showComments,
      showAllReplies,
      replyLimit,
      visibleComments,
      submitComment,
      toggleComments,
      viewMoreComments,
      getUserAvatar,
<<<<<<< HEAD
      statusIconClass,
      toggleReplyForm,
      submitReply,
      toggleViewMoreReplies,
      limitedReplies,
=======
>>>>>>> development
    };
  },
};
</script>

<style scoped>
.article-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
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
.course-thumbnail {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
/* Show Comments Button */
.toggle-comments-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #0069d9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.toggle-comments-button:hover {
  background-color: #0056b3;
}

/* Comments Section */
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
  background-color: #e9ecef;
  border-radius: 12px;
  padding: 10px 15px;
  max-width: 100%;
  word-wrap: break-word;
  margin-top: 5px;
}

.comment-content p, .reply-content p {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.comment-content small, .reply-content small {
  font-size: 0.8rem;
  color: #888;
}

.reply-link {
  color: #0069d9;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 5px;
  margin-left: 10px; /* Adjust this value as needed */
}

.reply-link:hover {
  text-decoration: underline;
}


.reply-link:hover {
  text-decoration: underline;
}

.replies {
  margin-left: 3rem;
  padding-left: 1rem;
  border-left: 2px solid #ddd;
  margin-top: 1rem;
}

.reply-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.view-more-replies, .view-more-comments {
  color: #0069d9;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 5px;
}

.view-more-replies:hover, .view-more-comments:hover {
  text-decoration: underline;
}

/* Comment form */
.comment-form {
  margin-top: 2rem;
}

.comment-input, .reply-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.comment-button, .reply-submit-button {
  background-color: #0069d9;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.comment-button:hover, .reply-submit-button:hover {
  background-color: #0056b3;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .article-details-container {
    padding: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .comment-content, .reply-content {
    padding: 8px 12px;
  }

  .comment-input, .reply-input {
    font-size: 0.9rem;
  }

  .comment-button, .reply-submit-button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
.status-success {
  color: green;
}

.status-failed {
  color: red;
}

</style>
