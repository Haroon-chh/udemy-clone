<template>
  <div class="quill-editor-fullscreen">
    <!-- Toolbar with Close and Publish Buttons -->
    <div class="editor-toolbar">
      <button class="btn btn-danger" @click="goBackToDashboard">Back to Dashboard</button>
      <button class="btn btn-success" @click="publishArticle">Publish Article</button>
    </div>
    <!-- Form Fields for the Article -->
    <div class="article-form">
      <label for="title">Article Title</label>
      <input type="text" v-model="articleData.title" id="title" placeholder="Enter article title" class="form-control" />

      <label for="course">Course ID</label>
      <input type="number" v-model="articleData.course_id" id="course" placeholder="Enter course ID" class="form-control" />

      <label for="image">Image URL</label>
      <input type="text" v-model="articleData.image_url" id="image" placeholder="Enter image URL" class="form-control" />

      <label for="status">Status</label>
      <select v-model="articleData.status" id="status" class="form-control">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <!-- Main Quill Editor Container for Article Body -->
      <div ref="quillEditor" class="quill-editor"></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick, onUnmounted, toRaw } from 'vue'; // Import toRaw to convert reactive data to plain object
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // Import Vuex store

export default {
  name: 'AddArticle',
  setup() {
    const quillEditor = ref(null);
    let quill = null;
    const router = useRouter(); // Create router instance
    const store = useStore(); // Create store instance

    // Reactive data object for article fields
    const articleData = reactive({
      title: 'Introduction to Article5', // Default title; can be modified in the form
      body: '', // Article content to be set from Quill editor
      image_url: 'https://example.com/laravel-intro.jpg', // Default image URL; can be modified
      user_id: store.getters['getUser'] ? store.getters['getUser'].id : 1, // Set the user_id dynamically from the store or default to 1
      course_id: 1, // Default course ID; can be modified in the form
      status: 'published', // Default status
    });

    // Initialize the Quill Editor
    const initializeQuillEditor = async () => {
      await nextTick(); // Ensure DOM is updated before initializing
      if (quillEditor.value) {
        quill = new Quill(quillEditor.value, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              ['link', 'image', 'code-block'],
            ],
          },
        });
      }
    };

    // Destroy the Quill instance
    const destroyQuillInstance = () => {
      if (quill) {
        quill.root.innerHTML = '';
        quill = null;
      }
    };

    // Publish the article
    const publishArticle = async () => {
      if (quill) {
        // Set the article body content from the Quill editor
        articleData.body = quill.root.innerHTML;

        console.log('Article Data Before Sending:', toRaw(articleData)); // Convert to raw object for logging

        try {
          // Dispatch Vuex action with plain JavaScript object
          await store.dispatch('admin/createArticle', toRaw(articleData));
          alert('Article published successfully!');
          goBackToDashboard(); // Navigate back to dashboard on success
        } catch (error) {
          alert('Failed to publish the article. Please try again.');
          console.error(error);
        }
      }
    };

    // Go back to the dashboard route
    const goBackToDashboard = () => {
      router.push({ name: 'dashboard' }); // Navigate back to the dashboard
    };

    // Initialize Quill Editor on component mount
    nextTick(() => initializeQuillEditor());

    // Cleanup Quill instance on component unmount
    onUnmounted(() => destroyQuillInstance());

    return { quillEditor, articleData, publishArticle, goBackToDashboard };
  },
};
</script>



<style scoped>
/* Full-Screen Quill Editor Overlay Styles */
.quill-editor-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  overflow: hidden;
  padding: 20px;
}

/* Toolbar Styling */
.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

/* Form Control Styling */
.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.quill-editor {
  flex: 1;
  height: 400px; /* Set a fixed height for the editor */
  overflow-y: auto;
}

/* Button Styling */
.btn {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-success {
  background-color: #2ecc71;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
