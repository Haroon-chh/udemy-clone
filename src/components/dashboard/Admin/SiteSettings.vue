<template>
  <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100 site-settings-container">
    <SuccessPopup :show="showSuccessPopup" message="Settings saved successfully!" />
    <ErrorPopup :show="showErrorPopup" :message="errorMessage" />

    <div class="row w-100 justify-content-center">
      <!-- Video on larger screens only -->
      <div class="col-lg-5 d-none d-lg-block">
        <video autoplay muted loop class="video-background" src="@/assets/settings.mp4"></video>
      </div>

      <!-- Settings box -->
      <div class="col-lg-5 d-flex justify-content-center">
        <div class="card p-5 shadow-lg settings-card">
          <h2 class="mb-4 text-center">Site Settings</h2>
          <form @submit.prevent="saveSettings">
            <!-- Logo Upload with Circle -->
            <div class="mb-4 text-center">
              <div class="logo-upload">
                <input type="file" id="logo" class="form-control d-none" @change="onLogoChange" />
                <label for="logo" class="position-relative">
                  <div
                    class="rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                    style="width: 150px; height: 150px; background-color: #f8f9fa; cursor: pointer; border: 2px solid #ccc;"
                  >
                    <img v-if="previewLogo" :src="previewLogo" alt="Logo Preview" class="img-fluid" />
                    <i v-else class="bi bi-camera fs-1 text-secondary"></i>
                  </div>
                </label>
              </div>
            </div>

            <p class="text-center text-muted">Click to update logo</p>

            <!-- Website Name (optional) -->
            <div class="mb-4">
              <label for="websiteName" class="form-label">Site Title</label>
              <input
                type="text"
                id="websiteName"
                class="form-control form-control-lg custom-input"
                v-model="siteSettings.websiteName"
                placeholder="Enter Site Title (optional)"
              />
            </div>

            <!-- Copyright (optional) -->
            <div class="mb-4">
              <label for="setting1" class="form-label">Copyright</label>
              <input
                type="text"
                id="setting1"
                class="form-control form-control-lg custom-input"
                v-model="siteSettings.setting1"
                placeholder="Enter Copyright (optional)"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-lg w-100">Save Settings</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from 'vuex';
import SuccessPopup from "@/components/SuccessPopup.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";

export default {
  name: "SiteSettingsComponent",
  components: { SuccessPopup, ErrorPopup },
  setup() {
    const store = useStore();

    const siteSettings = reactive({
      logo: null,
      websiteName: "",
      setting1: "",
    });

    const previewLogo = ref(null);
    const showSuccessPopup = ref(false);
    const showErrorPopup = ref(false);
    const errorMessage = ref('');

    // Handle logo file change
    const onLogoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        siteSettings.logo = file;
        previewLogo.value = URL.createObjectURL(file);
      }
    };

    // Save settings and allow partial updates
    const saveSettings = async () => {
      try {
        const updatedFields = {};

        updatedFields.site_title = siteSettings.websiteName || "Default Title";
        updatedFields.logo_path = siteSettings.logo || new File(["dummy"], "dummy.png", { type: "image/png" });
        updatedFields.copyright = siteSettings.setting1 || "Default Copyright";

        console.log("Updated fields:", updatedFields);

        // Dispatch the action without assigning to a variable
        await store.dispatch('SiteSettingStore/updateSiteSetting', updatedFields);

        showSuccessPopup.value = true;
        setTimeout(() => {
          showSuccessPopup.value = false;
        }, 3000);
      } catch (error) {
        console.error('Error saving site settings:', error.response?.data || error.message);
        errorMessage.value = 'Failed to save settings.';
        showErrorPopup.value = true;
        setTimeout(() => {
          showErrorPopup.value = false;
        }, 3000);
      }
    };


    return {
      siteSettings,
      previewLogo,
      onLogoChange,
      saveSettings,
      showSuccessPopup,
      showErrorPopup,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.site-settings-container {
  min-height: 100vh;
  padding: 50px 0;
}

.card {
  background-color: rgba(255, 255, 255, 0.9); /* Slight transparency */
  margin-left: 20px;
}

.settings-card {
  width: 100%;
  max-width: 35rem;
  background-color: rgba(255, 255, 255, 0.9);
}

.video-background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.logo-upload label {
  cursor: pointer;
}

.bi-camera {
  font-size: 50px;
  color: #999;
}

.custom-input {
  border: 2px solid #5a2ee3;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: #483dbb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

p.text-muted {
  font-size: 14px;
  color: #666;
}

@media (max-width: 992px) {
  .settings-card {
    width: 100%;
  }
}
</style>
