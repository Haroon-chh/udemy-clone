<!-- src/components/dashboard/Admin/CardContainer.vue -->
<template>
  <div class="card-editor-container">
    <!-- Cards Section -->
    <div class="cards-wrapper" v-if="!isEditorVisible">
      <!-- Only show cards when the editor is not visible -->
      <div class="card" v-for="(card, index) in cards" :key="index" @click="openEditor(card)">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </div>
    </div>

    <!-- Quill Editor Section -->
    <div class="quill-editor-overlay" v-if="isEditorVisible">
      <div class="quill-editor-container">
        <!-- Toolbar with Close and Publish Buttons -->
        <div class="editor-toolbar">
          <button class="btn btn-danger close-btn" @click="closeEditor">✖</button>
          <button class="btn btn-success" @click="publishArticle">Publish Article</button>
        </div>
        <!-- Quill Editor Container -->
        <div ref="quillEditor" class="quill-editor"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'CardContainer',
  setup() {
    const isEditorVisible = ref(false); // Track whether the Quill editor is visible or not
    const selectedCardContent = ref(''); // Store the content for the selected card
    const quillEditor = ref(null); // Reference to the Quill editor container
    let quill = null; // Reference to the Quill instance

    // List of cards
    const cards = ref([
      { id: 1, title: 'Login Statistics', description: 'View login trends and user activity.' },
      { id: 2, title: 'User Management', description: 'Manage user roles and permissions.' },
      { id: 3, title: 'Publish Articles', description: 'Create and publish new articles.', template: '<p>Write your article here...</p>' },
    ]);

    // Function to open the QuillEditor
    const openEditor = (card) => {
      if (card.title === 'Publish Articles') {
        selectedCardContent.value = card.template || ''; // Set the HTML template for the QuillEditor
        isEditorVisible.value = true; // Show the editor
        nextTick(() => {
          initializeQuillEditor(); // Ensure Quill is initialized after DOM update
        });
      }
    };

    // Initialize Quill Editor
    const initializeQuillEditor = () => {
      if (quillEditor.value) {
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(selectedCardContent.value); // Update existing content if Quill is already initialized
          return;
        }
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

        // Load initial HTML content if provided
        if (selectedCardContent.value) {
          quill.clipboard.dangerouslyPasteHTML(selectedCardContent.value);
        }
        console.log('Quill Editor initialized!'); // Debug: Confirm Quill Editor initialization
      }
    };

    // Publish the article and close the editor
    const publishArticle = () => {
      if (quill) {
        const content = quill.root.innerHTML; // Get the HTML content from Quill
        console.log('Published Content:', content);
        alert('Content published successfully!');
        // Here, you can send the content to the backend or perform any other action
        closeEditor(); // Close the editor after publishing
      }
    };

    // Function to close the QuillEditor
    const closeEditor = () => {
      isEditorVisible.value = false; // Hide the editor
      selectedCardContent.value = ''; // Clear the selected content
      console.log('Editor closed!'); // Debug: Confirm editor close
    };

    return {
      cards,
      isEditorVisible,
      selectedCardContent,
      quillEditor,
      openEditor,
      closeEditor,
      publishArticle,
    };
  },
};
</script>

<style scoped>
/* Main container for the entire component */
.card-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Card styling */
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  width: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Overlay for the Quill editor */
.quill-editor-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Container for the Quill editor */
.quill-editor-container {
  width: 80%;
  max-width: 900px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

/* Toolbar styling */
.editor-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.quill-editor {
  height: 400px;
}

/* Button styling */
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
</style>
