<template>
  <div class="quill-editor-container">
    <!-- Button to open modal -->
    <button 
      class="btn btn-primary float-end mb-3" 
      @click="isCreatePageModalVisible = true"
    >
      Add New Page
    </button>

    <!-- Existing Content Editor -->
    <div class="input-with-copy">
      <input
        type="text"
        v-model="rawContent"
        class="form-control"
        placeholder="Content to load in Quill"
        @input="updateQuillContent"
      />
      <button 
        @click="refreshPageContent" 
        class="btn refresh-btn d-flex align-items-center justify-content-center"
        title="Refresh Content"
      >
        <span class="material-icons">refresh</span>
      </button>
    </div>

    <div class="editor-toolbar">
      <div id="editor"></div>
    </div>

    <!-- Modal for adding new page -->
    <div 
      v-if="isCreatePageModalVisible" 
      class="modal fade show d-block" 
      id="createPageModal" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="createPageModalLabel" 
      aria-hidden="true"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createPageModalLabel">Create New Page</h5>
            <button 
              type="button" 
              class="close" 
              @click="isCreatePageModalVisible = false"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="pageTitle">Page Title</label>
              <input 
                type="text" 
                class="form-control" 
                v-model="newPageTitle"
                placeholder="Enter page title"
              />
            </div>
            <div class="form-group mt-3">
              <label for="pageBody">Page Body</label>
              <textarea 
                class="form-control" 
                v-model="newPageBody" 
                placeholder="Enter page content"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary" 
              @click="isCreatePageModalVisible = false"
            >
              Close
            </button>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="createNewPage"
            >
              Add Page
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- HTML Preview and Cleaned Content -->
    <div class="button-group mt-3">
      <button @click="showHtmlPreview" class="btn btn-primary me-2">
        Show HTML Preview
      </button>
      <button @click="updatePageContent" class="btn btn-success">
        Update Content
      </button>
    </div>

    <div class="html-preview mt-3" v-html="htmlPreview"></div>

    <div class="cleaned-content mt-3">
      <h5>Cleaned Content (Without &lt;p&gt;&lt;br&gt;&lt;/p&gt;):</h5>
      <textarea class="form-control" rows="5" readonly :value="cleanedContent"></textarea>
    </div>

    <!-- Message box -->
    <div v-if="message" class="alert mt-3" :class="messageClass">{{ message }}</div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import Quill from 'quill';
import { useRoute } from 'vue-router';
import AuthApiServices from '@/services/AuthApiServices';

// Custom Blot for Div Elements
const BlockEmbed = Quill.import('blots/block/embed');
class DivBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.innerHTML = value;
    return node;
  }
  static value(node) {
    return node.innerHTML;
  }
}
DivBlot.blotName = 'div';
DivBlot.tagName = 'div';
Quill.register(DivBlot); // Register the custom blot with Quill

export default {
  name: 'QuillEditorComponent',
  setup() {
    const store = useStore();
    const route = useRoute();
    const rawContent = ref('');
    const htmlPreview = ref('');
    const cleanedContent = ref('');
    const message = ref('');
    const messageClass = ref('');
    const newPageTitle = ref(''); // New page title
    const newPageBody = ref(''); // New page body
    const isCreatePageModalVisible = ref(false); // Control modal visibility
    let quill = null;

    const initializeQuill = () => {
      quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', { script: 'sub' }, { script: 'super' }],
            [{ align: [] }],
            ['code-block', 'clean'],
          ],
        },
      });

      // Ensure the editor is focused when initialized
      quill.focus();

      quill.on('text-change', () => {
        // Update the content without clearing the editor content on backspace
        rawContent.value = quill.root.innerHTML;
        cleanedContent.value = removeEmptyParagraphs(rawContent.value);
      });
    };

    const loadPageContent = async () => {
      resetQuill();
      const slug = route.params.slug;
      const pageData = await store.dispatch('PageSettingsStore/getPageBySlug', slug);

      if (pageData) {
        const formattedBody = pageData.body.replace(/\n/g, '<br>');
        await nextTick();
        rawContent.value = formattedBody;
        quill.clipboard.dangerouslyPasteHTML(0, formattedBody);
        quill.focus(); // Ensure editor is focused after loading content
      }
    };

    const resetQuill = () => {
      quill.setContents([]);
      rawContent.value = '';
      htmlPreview.value = '';
      cleanedContent.value = '';
    };

    const refreshPageContent = async () => {
      await loadPageContent();
    };

    const showHtmlPreview = () => {
      htmlPreview.value = quill.root.innerHTML;
    };

    const removeEmptyParagraphs = (html) => html.replace(/<p><br><\/p>/g, '');

    const updatePageContent = async () => {
      const cleanedBody = cleanedContent.value;
      const finalContent = cleanedBody.replace(/<br\s*\/?>/g, ''); // Remove all <br> tags

      const response = await store.dispatch('PageSettingsStore/updatePageContent', finalContent);
      showMessage(response.message || 'Page updated successfully!', response.success ? 'alert-success' : 'alert-danger');
    };

    const createNewPage = async () => {
      const data = {
        title: newPageTitle.value,
        body: newPageBody.value,
      };

      try {
        const response = await AuthApiServices.PostRequest('/create-page', data);
        showMessage(response.message, response.success ? 'alert-success' : 'alert-danger');

        if (response.success) {
          isCreatePageModalVisible.value = false; // Close modal on success
        }
      } catch (error) {
        showMessage('Error creating page', 'alert-danger');
      }
    };

    const showMessage = (msg, className) => {
      message.value = msg;
      messageClass.value = className;

      // Hide the message after 2 seconds
      setTimeout(() => {
        message.value = '';
        messageClass.value = '';
      }, 2000);
    };

    onMounted(async () => {
      await nextTick();
      initializeQuill();
      await loadPageContent();
    });

    watch(() => route.params.slug, async () => await loadPageContent());

    return {
      rawContent,
      htmlPreview,
      cleanedContent,
      message,
      messageClass,
      newPageTitle,
      newPageBody,
      isCreatePageModalVisible, // Control modal visibility
      refreshPageContent,
      showHtmlPreview,
      updatePageContent,
      createNewPage,
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
  margin-bottom: 15px;
  position: relative;
}

#editor {
  height: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.refresh-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: #f1f1f1;
  border-radius: 50%;
  border: 1px solid #ccc;
  transition: background-color 0.3s, transform 0.2s;
}

.refresh-btn:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

.material-icons {
  font-size: 20px;
  color: #333;
}

.button-group button {
  width: auto;
}

.html-preview,
.cleaned-content {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

</style>
