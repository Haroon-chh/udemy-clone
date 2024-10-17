<template>
  <div class="add-article-page">
    <!-- Toolbar with Back and Publish Buttons -->
    <div class="editor-toolbar">
      <button class="btn btn-danger" @click="goBackToDashboard">Back to Dashboard</button>
      <button class="btn btn-success" @click="publishArticle">Publish Article</button>
    </div>

    <!-- Scrollable Content Section -->
    <div class="scrollable-content">
      <!-- Form Fields for the Article -->
      <div class="article-form">
        <label for="title">Article Title</label>
        <input type="text" v-model="articleData.title" id="title" placeholder="Enter article title" class="form-control" />

        <label for="course">Course ID</label>
        <input type="number" v-model="articleData.course_id" id="course" placeholder="Enter course ID" class="form-control" />

        <label for="image">Image File</label>
        <input type="file" @change="handleImageUpload" id="image" class="form-control" />

        <label for="user">User ID</label>
        <input type="number" v-model="articleData.user_id" id="user" placeholder="Enter user ID" class="form-control" />

        <label for="status">Status</label>
        <select v-model="articleData.status" id="status" class="form-control">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <!-- Main Quill Editor Container for Article Body -->
        <div ref="quillEditor" class="quill-editor"></div>
      </div>

      <!-- HTML Conversion Button -->
      <div class="html-convert-button">
        <button class="btn btn-secondary" @click="convertToHtml">Convert to HTML</button>
      </div>

      <!-- HTML Output Section (Initially Hidden) -->
      <div v-if="htmlOutput" class="html-output">
        <h3>HTML Output</h3>
        <pre>{{ htmlOutput }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick, onUnmounted, toRaw } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'AddArticle',
  setup() {
    const quillEditor = ref(null);
    let quill = null;
    const router = useRouter();
    const store = useStore();
    const htmlOutput = ref('');
    const selectedImage = ref(null); // Reference to store the selected file

    const articleData = reactive({
      title: '',
      body: '',
      image_path: '',
      user_id: '',
      course_id: '',
      status: 'draft',
    });

    const initializeQuillEditor = async () => {
      await nextTick();
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

    const convertToHtml = () => {
      if (quill) {
        htmlOutput.value = quill.root.innerHTML;
      }
    };

    const destroyQuillInstance = () => {
      if (quill) {
        quill.root.innerHTML = '';
        quill = null;
      }
    };

    // Handle image file selection
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedImage.value = file; // Store the file
      }
    };

    const uploadImageToServer = async () => {
      if (!selectedImage.value) return;

      // Create FormData and append the file
      const formData = new FormData();
      formData.append('image', selectedImage.value);

      try {
        const response = await store.dispatch('admin/uploadImage', formData); // Make sure to implement this action in Vuex
        return response.data.image_path; // Assuming backend returns the saved image path
      } catch (error) {
        console.error('Failed to upload image:', error);
        throw error;
      }
    };

    const publishArticle = async () => {
      if (!articleData.title || !articleData.course_id || !articleData.user_id || !articleData.status) {
        alert('Please fill in all required fields.');
        return;
      }

      if (quill) {
        articleData.body = quill.root.innerHTML;

        if (!articleData.body || articleData.body === '<p><br></p>') {
          alert('Please enter content for the article body.');
          return;
        }

        try {
          // If an image is selected, upload it to the server first
          if (selectedImage.value) {
            articleData.image_path = await uploadImageToServer();
          }

          await store.dispatch('admin/createArticle', toRaw(articleData));  // Send article data to the backend
          alert('Article published successfully!');
          goBackToDashboard();
        } catch (error) {
          alert('Failed to publish the article. Please try again.');
          console.error(error);
        }
      }
    };

    const goBackToDashboard = () => {
      router.push({ name: 'dashboard' });
    };

    nextTick(() => initializeQuillEditor());

    onUnmounted(() => destroyQuillInstance());

    return {
      quillEditor,
      articleData,
      publishArticle,
      goBackToDashboard,
      htmlOutput,
      convertToHtml,
      handleImageUpload,
    };
  },
};
</script>

<style scoped>
.add-article-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0;
  z-index: 10;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fafafa;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-control {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.quill-editor {
  height: 400px;
  overflow-y: auto;
}

.html-convert-button {
  margin-top: 20px;
}

.html-output {
  background-color: #eaeaea;
  padding: 20px;
  margin-top: 20px;
  border-radius: 5px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

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

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
