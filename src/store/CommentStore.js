import AuthApiServices from '@/services/AuthApiServices';

const state = {
  comments: [],
};

const organizeComments = (comments) => {
  // Organize comments by grouping replies under their parent comments
  const commentMap = {};

  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      // If it's a root comment (no parent), store it in the map
      commentMap[comment.id] = { ...comment, replies: [] };
    } else {
      // If it's a reply, find its parent and push it to the replies array
      if (commentMap[comment.parent_comment_id]) {
        commentMap[comment.parent_comment_id].replies.push(comment);
      }
    }
  });

  // Return only the root comments (which now have their replies embedded)
  return Object.values(commentMap);
};

const mutations = {
  SET_COMMENTS(state, comments) {
    const organizedComments = organizeComments(comments); // Organize comments before committing
    state.comments = organizedComments;
  },
  ADD_COMMENT(state, comment) {
    if (!state.comments) {
      state.comments = [];
    }
    state.comments.push(comment); // Safely push the new comment
  },
  ADD_REPLY(state, { reply, parentCommentId }) {
    const parentComment = state.comments.find((comment) => comment.id === parentCommentId);
    if (parentComment) {
      parentComment.replies.push(reply);
    }
  },
};

const actions = {
  async fetchComments({ commit }, slug) {
    try {
      const response = await AuthApiServices.GetRequest(`/articles/${slug}/comments`);
      
      // Log the full response to verify structure
      console.log('Full comments API response:', response);
      
      if (response && response.data) {
        commit('SET_COMMENTS', response.data); // Organize and set the comments
      } else {
        throw new Error('Invalid comments data structure');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  async postComment({ commit }, { slug, commentData }) {
    try {
      const response = await AuthApiServices.PostRequest(`/articles/${slug}/post-comment`, commentData);
      if (response && response.data) {
        commit('ADD_COMMENT', response.data); // Add the posted comment to the store
      } else {
        throw new Error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  },

  async postReply({ commit }, { slug, payload }) {
    try {
      const response = await AuthApiServices.PostRequest(`/articles/${slug}/post-comment`, payload);
      if (response && response.data) {
        commit('ADD_REPLY', { reply: response.data, parentCommentId: payload.parent_comment_id });
      } else {
        throw new Error('Error posting reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      throw error;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
