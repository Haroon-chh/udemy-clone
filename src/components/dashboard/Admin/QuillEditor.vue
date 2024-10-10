<!-- src/components/QuillDashboard.vue -->
<template>
    <div>
      <!-- Cards Section for choosing Quill Editor or viewing other options -->
      <div v-if="!isEditorVisible" class="card-container">
        <div class="cards-wrapper">
          <div class="card" v-for="(card, index) in cards" :key="index" @click="handleCardClick(card)">
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
  
      <!-- Full-Screen Quill Editor Overlay (for articles) -->
      <div v-if="isEditorVisible" class="quill-editor-fullscreen">
        <!-- Toolbar with Close and Publish Buttons -->
        <div class="editor-toolbar">
          <button class="btn btn-danger" @click="closeEditor">✖</button>
          <button class="btn btn-success" @click="publishArticle">Publish Article</button>
        </div>
        <!-- Main Quill Editor Container -->
        <div ref="quillEditor" class="quill-editor"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, nextTick, onUnmounted } from 'vue';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  export default {
    name: 'QuillDashboard',
    setup() {
      // Refs for the Quill editor containers
      const quillEditor = ref(null);
      let quill = null; // Main Quill editor instance
  
      // State to control visibility
      const isEditorVisible = ref(false);
  
      // List of cards for the dashboard
      const cards = ref([
        { id: 1, title: 'Quill Editor', description: 'Edit and publish articles using Quill Editor.' },
        { id: 2, title: 'User Management', description: 'Manage user roles and permissions in the system.' },
        { id: 3, title: 'Analytics', description: 'View user statistics and activity reports.' },
        { id: 4, title: 'Settings', description: 'Adjust system settings and configurations.' },
        { id: 5, title: 'Support', description: 'Access help and support resources.' },
      ]);
  
      // Handle card click to open Quill editor
      const handleCardClick = async (card) => {
        if (card.title === 'Quill Editor') {
          isEditorVisible.value = true; // Show the QuillEditor in full-screen mode
          await nextTick(); // Ensure DOM is updated before initializing
          initializeQuillEditor(); // Initialize the Quill Editor
        }
      };
  
      // Initialize the main Quill Editor
      const initializeQuillEditor = () => {
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
          console.log('Main Quill Editor initialized');
        }
      };
  
      // Cleanup Quill instance
      const destroyQuillInstance = () => {
        if (quill) {
          quill.root.innerHTML = '';
          quill = null;
          console.log('Main Quill Editor destroyed');
        }
      };
  
      // Publish the article and close the editor
      const publishArticle = () => {
        if (quill) {
          const content = quill.root.innerHTML; // Get the HTML content
          console.log('Published Content:', content); // For demonstration
          closeEditor(); // Close the editor after publishing
        }
      };
  
      // Close the main Quill editor
      const closeEditor = () => {
        isEditorVisible.value = false;
        destroyQuillInstance(); // Destroy the main Quill instance
      };
  
      // Cleanup on unmount
      onUnmounted(() => {
        destroyQuillInstance();
      });
  
      return {
        cards,
        quillEditor,
        isEditorVisible,
        handleCardClick,
        publishArticle,
        closeEditor,
      };
    },
  };
  </script>
  
  <style scoped>
  /* General Container Styles */
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  /* Cards Wrapper */
  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
  }
  
  /* Individual Card Styling */
  .card {
    width: 280px;
    padding: 20px;
    border: 2px solid #ddd;
    border-radius: 15px;
    background-color: #f8f9fa;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  .card h3 {
    margin: 0 0 10px;
    font-size: 1.25rem;
    color: #333;
  }
  
  .card p {
    font-size: 1rem;
    color: #666;
  }
  
  /* Full-Screen Quill Editor Overlay Styles */
  .quill-editor-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
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
  
  .quill-editor {
    flex: 1;
    height: calc(100vh - 60px); /* Adjust height to take full screen */
    overflow-y: auto;
  }
  
  /* Button Styling */
  .btn {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .btn-danger {
    background-color: #e74c3c;
    color: white;
  }
  
  .btn-success {
    background-color: #2ecc71;
    color: white;
  }
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .card {
      width: 100%;
      max-width: 400px;
    }
  
    .quill-editor-fullscreen {
      padding: 10px;
    }
  
    .editor-toolbar {
      margin-bottom: 10px;
    }
  }
  
  @media (max-width: 576px) {
    .card-container {
      padding: 10px;
    }
  
    .cards-wrapper {
      flex-direction: column;
      align-items: center;
    }
  
    .quill-editor-fullscreen {
      padding: 5px;
    }
  
    .editor-toolbar {
      margin-bottom: 5px;
    }
  }
  </style>
  