<template>
    <div class="quill-editor-container">
      <!-- Input Field -->
      <div class="input-with-copy">
        <input
          type="text"
          v-model="rawContent"
          class="form-control"
          placeholder="Content to load in Quill"
          @input="updateQuillContent"
        />
      </div>
  
      <!-- Quill Editor -->
      <div id="editor"></div>
  
      <!-- Reset Quill Button -->
      <button @click="resetQuill" class="btn btn-danger mt-2">Reset</button>
  
      <!-- Show HTML Preview Button -->
      <button @click="showHtmlPreview" class="btn btn-primary mt-2">
        Show HTML Preview
      </button>
  
      <!-- Rendered HTML Preview -->
      <div class="html-preview mt-3" v-html="htmlPreview"></div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from 'vue';
  import { useStore } from 'vuex';
  import Quill from 'quill';
  import { useRoute } from 'vue-router'; // To get slug from route params
  
  export default {
    name: 'QuillEditorComponent',
    setup() {
      const store = useStore(); // Access Vuex store
      const route = useRoute(); // Get route parameters (slug)
      const rawContent = ref(''); // Input value
      const htmlPreview = ref(''); // HTML preview
      let quill = null; // Quill instance
  
      const initializeQuill = () => {
        quill = new Quill('#editor', {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              [{ align: [] }],
              ['code-block', 'clean'],
            ],
          },
        });
  
        quill.on('text-change', () => {
          rawContent.value = quill.root.innerHTML;
        });
  
        console.log('Quill editor initialized.');
      };
  
      const loadPageContent = async () => {
        const slug = route.params.slug; // Extract slug from route
        const pageData = await store.dispatch('PageSettingsStore/getPageBySlug', slug);
        if (pageData) {
          rawContent.value = pageData.body; // Load body into input
          quill.root.innerHTML = pageData.body; // Set body in Quill
          console.log('Page content loaded:', pageData.body);
        }
      };
  
      const updateQuillContent = () => {
        quill.root.innerHTML = rawContent.value;
      };
  
      const resetQuill = () => {
        quill.setContents([]);
        rawContent.value = '';
        htmlPreview.value = '';
        console.log('Quill editor reset.');
      };
  
      const showHtmlPreview = () => {
        htmlPreview.value = quill.root.innerHTML;
        console.log('HTML preview:', htmlPreview.value);
      };
  
      onMounted(async () => {
        await nextTick(); // Ensure DOM is ready
        initializeQuill(); // Initialize Quill editor
        await loadPageContent(); // Load content by slug
      });
  
      return {
        rawContent,
        htmlPreview,
        resetQuill,
        showHtmlPreview,
        updateQuillContent,
      };
    },
  };
  </script>
  
  <style scoped>
  .quill-editor-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .input-with-copy {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  input.form-control {
    flex: 1;
  }
  
  #editor {
    height: 300px;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-top: 10px;
  }
  
  button {
    width: 100%;
  }
  
  .html-preview {
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  }
  </style>
  