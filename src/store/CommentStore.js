import AuthApiServices from '@/services/AuthApiServices';

const state = {
  comments: [],
};

// Helper function to organize comments with replies
const organizeComments = (comments) => {
  const commentMap = {};

  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      // Root comment
      commentMap[comment.id] = { ...comment, replies: [] };
    } else {
      // Reply - find the parent
      if (!commentMap[comment.parent_comment_id]) {
        commentMap[comment.parent_comment_id] = { id: comment.parent_comment_id, replies: [] };
      }
      commentMap[comment.parent_comment_id].replies.push(comment);
    }
  });

  // Return only the root comments with nested replies
  return Object.values(commentMap);
};

const mutations = {
  SET_COMMENTS(state, comments) {
    const organizedComments = organizeComments(comments);
    state.comments = organizedComments;
  },
  ADD_COMMENT(state, comment) {
    if (!comment.parent_comment_id) {
      // It's a root-level comment, add it to the main list
      state.comments.push({ ...comment, replies: [] });
    } else {
      // If it's a reply, delegate to ADD_REPLY for consistency
      this.commit('CommentStore/ADD_REPLY', { reply: comment, parentCommentId: comment.parent_comment_id });
    }
  },
  ADD_REPLY(state, { reply, parentCommentId }) {
    const addReplyToParent = (parentComments) => {
      for (const parent of parentComments) {
        if (parent.id === parentCommentId) {
          parent.replies.push(reply);
          return true;
        }
        if (parent.replies && addReplyToParent(parent.replies)) {
          return true;
        }
      }
      return false;
    };
    addReplyToParent(state.comments);
  },
};

const actions = {
  async fetchComments({ commit }, slug) {
    try {
      const response = await AuthApiServices.GetRequest(`/articles/${slug}/comments`);
      if (response && response.data) {
        commit('SET_COMMENTS', response.data);
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
        commit('ADD_COMMENT', response.data);
        return response;
      } else {
        throw new Error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  },

  async postReply({ commit }, { slug, parentCommentId, replyData }) {
    try {
      console.log(`Making POST request to: /articles/${slug}/post-comment/${parentCommentId}`, replyData);
      
      const response = await AuthApiServices.PostRequest(`/articles/${slug}/post-comment/${parentCommentId}`, replyData);
      if (response && response.data) {
        commit('ADD_REPLY', { reply: response.data, parentCommentId });
        return response;
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
