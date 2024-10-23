import AuthApiServices from '@/services/AuthApiServices';

const CommentStore = {
  namespaced: true,
  state: {
    comments: [],
  },
  getters: {
    getComments: (state) => state.comments,
  },
  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
    addComment(state, comment) {
      state.comments.push(comment);
    },
  },
  actions: {
    async fetchComments({ commit }, articleId) {
      try {
        const response = await AuthApiServices.GetRequest(`/articles/comments?article_id=${articleId}`);
        commit('setComments', response.data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async postComment({ commit }, payload) {
      try {
        const response = await AuthApiServices.PostRequest(`/articles/post-comment`, payload);
        commit('addComment', response.data);
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    },
    async postReply({ commit }, { commentId, payload }) {
      try {
        const response = await AuthApiServices.PostRequest(`/articles/post-comment/${commentId}`, payload);
        commit('addComment', response.data);
      } catch (error) {
        console.error('Error posting reply:', error);
      }
    },
  },
};

export default CommentStore;
