<template>
  <div class="quill-editor-container">
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

    <div v-if="message" class="alert mt-3" :class="messageClass">{{ message }}</div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import Quill from 'quill';
import { useRoute } from 'vue-router';

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
Quill.register(DivBlot);

// Custom Clipboard Configuration
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
            ['link', 'image', { script: 'sub' }, { script: 'super' }],
            [{ align: [] }],
            ['code-block', 'clean'],
          ],
        },
      });

      quill.on('text-change', () => {
        rawContent.value = quill.root.innerHTML;
        cleanedContent.value = removeEmptyParagraphs(rawContent.value);
      });

      console.log('Quill editor initialized with custom clipboard and div blot.');
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

    const refreshPageContent = async () => {
      console.log('Refreshing page content...');
      await loadPageContent();
    };

    const showHtmlPreview = () => {
      htmlPreview.value = quill.root.innerHTML;
      console.log('HTML preview:', htmlPreview.value);
    };

    const removeEmptyParagraphs = (html) => html.replace(/<p><br><\/p>/g, '');

    const updatePageContent = async () => {
      const cleanedBody = cleanedContent.value;
      const finalContent = cleanedBody.replace(/<br\s*\/?>/g, ''); // Remove all <br> tags

      const response = await store.dispatch('PageSettingsStore/updatePageContent', finalContent);

      message.value = response.message || 'Page updated successfully!';
      messageClass.value = response.success ? 'alert-success' : 'alert-danger';
      console.log('Page update response:', response);
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
      refreshPageContent,
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
