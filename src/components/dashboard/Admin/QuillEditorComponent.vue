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

    <!-- Cleaned Content Field -->
    <div class="cleaned-content mt-3">
      <h5>Cleaned Content (Without &lt;p&gt;&lt;br&gt;&lt;/p&gt;):</h5>
      <textarea class="form-control" rows="5" readonly :value="cleanedContent"></textarea>
    </div>

    <!-- Update Button -->
    <button @click="updatePageContent" class="btn btn-success mt-3">
      Update Content
    </button>

    <!-- Success/Error Message -->
    <div v-if="message" class="alert mt-3" :class="messageClass">{{ message }}</div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import Quill from 'quill';
import { useRoute } from 'vue-router';
import AuthApiServices from '@/services/AuthApiServices'; // Import Auth API Service

const Clipboard = Quill.import('modules/clipboard');

class CustomClipboard extends Clipboard {
  onPaste(event) {
    const clipboardEvent = event.clipboardData || window.clipboardData;
    if (clipboardEvent) {
      event.preventDefault();
      const text = clipboardEvent.getData('text/plain');
      const html = text.replace(/\n/g, '<br>');
      this.quill.clipboard.dangerouslyPasteHTML(0, html);
    }
  }
}

Quill.register('modules/clipboard', CustomClipboard);

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
    let quill = null;

    const initializeQuill = () => {
      quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          clipboard: true,
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
        cleanedContent.value = removeEmptyParagraphs(rawContent.value);
      });

      console.log('Quill editor initialized with custom clipboard.');
    };

    const loadPageContent = async () => {
      const slug = route.params.slug;
      const pageData = await store.dispatch('PageSettingsStore/getPageBySlug', slug);

      if (pageData) {
        const formattedBody = pageData.body.replace(/\n/g, '<br>');
        await nextTick();
        rawContent.value = formattedBody;
        quill.clipboard.dangerouslyPasteHTML(0, formattedBody);
        console.log('Page content loaded:', formattedBody);
      }
    };

    const resetQuill = () => {
      quill.setContents([]);
      rawContent.value = '';
      htmlPreview.value = '';
      cleanedContent.value = '';
      console.log('Quill editor reset.');
    };

    const showHtmlPreview = () => {
      htmlPreview.value = quill.root.innerHTML;
      console.log('HTML preview:', htmlPreview.value);
    };

    const removeEmptyParagraphs = (html) => {
      return html.replace(/<p><br><\/p>/g, '');
    };

    const updatePageContent = async () => {
      try {
        const pageId = store.state.PageSettingsStore.currentPage.id; // Get page ID from store
        const response = await AuthApiServices.PostRequest(`/update-page/${pageId}`, {
          body: cleanedContent.value,
        });

        message.value = response.message || 'Page updated successfully!';
        messageClass.value = 'alert-success';
        console.log('Page updated successfully:', response);
      } catch (error) {
        message.value = 'Failed to update page. Please try again.';
        messageClass.value = 'alert-danger';
        console.error('Error updating page:', error);
      }
    };

    onMounted(async () => {
      await nextTick();
      initializeQuill();
      await loadPageContent();
    });

    watch(
      () => route.params.slug,
      async () => {
        await loadPageContent();
      }
    );

    return {
      rawContent,
      htmlPreview,
      cleanedContent,
      message,
      messageClass,
      resetQuill,
      showHtmlPreview,
      updatePageContent,
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

.html-preview, .cleaned-content {
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}
</style>
