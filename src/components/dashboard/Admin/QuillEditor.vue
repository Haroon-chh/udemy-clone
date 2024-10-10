<!-- src/components/QuillDashboard.vue -->
<template>
    <div class="dashboard-container">
      <!-- Cards Section: Visible when no editor is open -->
      <div v-if="!isEditorVisible && !isPlaygroundVisible" class="card-container">
        <div class="cards-wrapper">
          <div
            class="card"
            v-for="(card, index) in cards"
            :key="index"
            @click="handleCardClick(card)"
          >
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
        </div>
      </div>
  
      <!-- Quill Editor Overlay (for articles) -->
      <div v-if="isEditorVisible" class="quill-editor-overlay">
        <div class="quill-editor-container">
          <!-- Toolbar with Close and Publish Buttons -->
          <div class="editor-toolbar">
            <button class="btn btn-danger" @click="closeEditor">✖</button>
            <button class="btn btn-success" @click="publishArticle">Publish Article</button>
          </div>
          <!-- Main Quill Editor Container -->
          <div ref="quillEditor" class="quill-editor"></div>
        </div>
      </div>
  
      <!-- Quill Playground Overlay -->
      <div v-if="isPlaygroundVisible" class="playground-container">
        <!-- Playground Header for Example Dropdown -->
        <div class="playground-header">
          <label for="exampleDropdown">Example:</label>
          <select v-model="selectedExample" id="exampleDropdown" @change="loadExample">
            <option v-for="example in examples" :key="example.id" :value="example.name">
              {{ example.name }}
            </option>
          </select>
        </div>
  
        <!-- Left Panel for File Tabs -->
        <div class="playground-content">
          <div class="playground-left-panel">
            <ul class="file-tabs">
              <li
                v-for="tab in selectedExampleTabs"
                :key="tab"
                :class="{ active: activeTab === tab }"
                @click="changeTab(tab)"
              >
                {{ tab }}
              </li>
            </ul>
            <div class="file-content">
              <pre v-if="activeTab === 'index.html'"><code>{{ selectedExampleContent.html }}</code></pre>
              <pre v-if="activeTab === 'index.js'"><code>{{ selectedExampleContent.js }}</code></pre>
              <pre v-if="activeTab === 'index.css'"><code>{{ selectedExampleContent.css }}</code></pre>
            </div>
          </div>
  
          <!-- Right Panel for Quill Editor Output -->
          <div class="playground-right-panel">
            <!-- Editor Header -->
            <div class="editor-toolbar">
              <h3>{{ activeTab }} Output</h3>
              <button class="btn btn-danger" @click="closePlayground">✖</button>
            </div>
            <!-- Editor Container -->
            <div ref="playgroundEditor" class="quill-editor"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, nextTick, onUnmounted } from 'vue'; // Removed onMounted as it was unused
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  export default {
    name: 'QuillDashboard',
    setup() {
      // References for the Quill editor containers
      const quillEditor = ref(null);
      const playgroundEditor = ref(null);
  
      let quill = null; // Reference for the main Quill editor
      let quillPlayground = null; // Reference for the Playground Quill editor
  
      // State to control visibility and content
      const isEditorVisible = ref(false);
      const isPlaygroundVisible = ref(false);
      const selectedCardContent = ref('');
  
      // Selected example and content state
      const selectedExample = ref('Basic setup with snow theme');
      const activeTab = ref('index.html');
      const selectedExampleContent = ref({ html: '', js: '', css: '' });
  
      // List of cards for navigation
      const cards = ref([
        { id: 1, title: 'Quill Editor', description: 'Edit and publish articles using Quill Editor.', template: '<p>Write your article here...</p>' },
        { id: 2, title: 'Quill Playground', description: 'Explore the features of Quill Editor in Playground mode.' }
      ]);
  
      // List of examples for the Playground
      const examples = ref([
        {
          id: 1,
          name: 'Basic setup with snow theme',
          tabs: ['index.html', 'index.js'],
          content: {
            html: '<p>Basic setup with snow theme.</p>',
            js: `const quill = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
      ],
    },
    placeholder: 'Compose an epic...',
    theme: 'snow', // or 'bubble'
  });`,
            css: '',
          },
        },
        {
          id: 2,
          name: 'Using Quill inside a form',
          tabs: ['index.html', 'index.js'],
          content: {
            html: '<form><input type="text" placeholder="Your name" /><textarea id="editor"></textarea></form>',
            js: `const initialData = {
    name: 'Wall-E',
    location: 'Earth',
    about: [
      {
        insert: 'A robot who has developed sentience, and is the only robot of his kind shown to be still functioning on Earth.\\n',
      },
    ],
  };
  const quill = new Quill('#editor', {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['link', 'image', 'blockquote', 'code-block'],
      ],
    },
    placeholder: 'Tell your story...',
    theme: 'snow',
  });`,
            css: '',
          },
        },
        {
          id: 3,
          name: 'Custom font and formats',
          tabs: ['index.css', 'index.js'],
          content: {
            html: '',
            js: `const Font = Quill.import('formats/font');
  Font.whitelist = ['mirza', 'roboto'];
  Quill.register(Font, true);
  
  const quill = new Quill('#editor', {
    modules: {
      toolbar: '#toolbar',
    },
    theme: 'snow',
  });`,
            css: `body {
    font-family: 'Mirza', sans-serif;
  }`,
          },
        },
      ]);
  
      // Update example tabs when example changes
      const selectedExampleTabs = ref([]);
      const loadExample = () => {
        const example = examples.value.find((ex) => ex.name === selectedExample.value);
        if (example) {
          selectedExampleTabs.value = example.tabs;
          selectedExampleContent.value = { ...example.content };
          activeTab.value = example.tabs[0];
          initializePlaygroundEditor();
        }
      };
  
      // Change the active tab to display content
      const changeTab = (tab) => {
        activeTab.value = tab;
        initializePlaygroundEditor(); // Reload content based on active tab
      };
  
      // Handle card click to open the respective editor
      const handleCardClick = async (card) => {
        if (card.title === 'Quill Editor') {
          selectedCardContent.value = card.template || '';
          isEditorVisible.value = true;
          isPlaygroundVisible.value = false;
          await nextTick(); // Wait for DOM update
          initializeQuillEditor(); // Initialize main Quill editor
        } else if (card.title === 'Quill Playground') {
          isPlaygroundVisible.value = true;
          isEditorVisible.value = false;
          await nextTick(); // Wait for DOM update
          loadExample(); // Load playground example
        }
      };
  
      // Initialize the main Quill Editor
      const initializeQuillEditor = () => {
        destroyQuillInstances(); // Destroy previous instances
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
  
          // Load initial HTML content if provided
          if (selectedCardContent.value) {
            quill.clipboard.dangerouslyPasteHTML(selectedCardContent.value);
          }
        }
      };
  
      // Initialize the Playground Quill Editor
      const initializePlaygroundEditor = () => {
        destroyQuillInstances(); // Destroy previous instances
        if (playgroundEditor.value) {
          quillPlayground = new Quill(playgroundEditor.value, {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
              ],
            },
            placeholder: 'Compose an epic...',
          });
  
          // Load content based on active tab
          if (activeTab.value === 'index.html') {
            quillPlayground.clipboard.dangerouslyPasteHTML(selectedExampleContent.value.html);
          } else if (activeTab.value === 'index.js') {
            quillPlayground.clipboard.dangerouslyPasteHTML(`<pre><code>${selectedExampleContent.value.js}</code></pre>`);
          } else if (activeTab.value === 'index.css') {
            quillPlayground.clipboard.dangerouslyPasteHTML(`<pre><code>${selectedExampleContent.value.css}</code></pre>`);
          }
        }
      };
  
      // Destroy all Quill instances before creating new ones
      const destroyQuillInstances = () => {
        if (quill) {
          quill.root.innerHTML = '';
          quill = null;
        }
        if (quillPlayground) {
          quillPlayground.root.innerHTML = '';
          quillPlayground = null;
        }
      };
  
      // Cleanup on unmount
      onUnmounted(() => {
        destroyQuillInstances();
      });
  
      return {
        cards,
        isEditorVisible,
        isPlaygroundVisible,
        quillEditor,
        playgroundEditor,
        selectedCardContent,
        selectedExample,
        selectedExampleTabs,
        activeTab,
        selectedExampleContent,
        handleCardClick,
        loadExample,
        changeTab,
        closeEditor: () => (isEditorVisible.value = false),
        closePlayground: () => (isPlaygroundVisible.value = false),
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  
  .card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .card {
    width: 250px;
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
  
  /* Quill Editor Container */
  .quill-editor-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .quill-editor-container {
    width: 80%;
    max-width: 900px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    position: relative;
  }
  
  /* Playground Layout */
  .playground-container {
    display: flex;
    height: 100vh;
  }
  
  .playground-header {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
  }
  
  #exampleDropdown {
    margin-left: 10px;
    padding: 5px;
  }
  
  /* Left Panel with Tabs */
  .playground-left-panel {
    width: 30%;
    background-color: #f0f0f0;
    padding: 20px;
    border-right: 1px solid #ddd;
    overflow-y: auto;
  }
  
  .file-tabs {
    list-style: none;
    padding: 0;
  }
  
  .file-tabs li {
    cursor: pointer;
    padding: 10px;
    margin: 5px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .file-tabs li.active {
    background-color: #e0e0e0;
  }
  
  /* Right Panel for Editor Output */
  .playground-right-panel {
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .quill-editor {
    height: 400px;
    margin-top: 20px;
  }
  
  /* Toolbar Styling */
  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
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
  