<template>
  <div class="container-fluid mt-2 ps-3 pt-4 pe-3">
    <h2 class="mb-4 fw-bold">Trending Now</h2>
    <hr>
    <div class="row">
      <!-- Left Section (ChatGPT top skill) -->
      <div class="col-12 col-md-4 mb-4">
        <h3 class="fw-bold">ChatGPT is a top skill</h3>
        <a href="#" class="text-primary fw-bold no-underline">
          See ChatGPT courses
          <span class="material-icons">chevron_right</span>
        </a>
        <p class="text-muted fw-bold">3,583,630 learners</p>
        <button class="trending-btn fw-bold">
          Show all trending skills
          <span class="material-icons">trending_up</span>
        </button>
      </div>

      <!-- Right Section (Skill categories) -->
      <div class="col-12 col-md-8">
        <div class="row">
          <!-- Development Section -->
          <div class="col-12 col-sm-6 col-md-3 mb-4">
            <h4 class="text-dark fw-bold">Development</h4>
            <ul class="list-unstyled fw-bold">
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Python
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">45,893,816 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Web Development
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">13,604,195 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Data Science
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">7,439,491 learners</p>
              </li>
            </ul>
          </div>

          <!-- Design Section -->
          <div class="col-12 col-sm-6 col-md-3 mb-4">
            <h4 class="text-dark fw-bold">Design</h4>
            <ul class="list-unstyled fw-bold">
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Blender
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">2,755,569 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Graphic Design
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">4,338,553 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  User Experience (UX) Design
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">1,990,703 learners</p>
              </li>
            </ul>
          </div>

          <!-- Business Section -->
          <div class="col-12 col-md-6">
            <h4 class="text-dark fw-bold">Business</h4>
            <ul class="list-unstyled fw-bold">
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  PMI Project Management Professional (PMP)
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">2,389,089 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Microsoft Power BI
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">4,287,367 learners</p>
              </li>
              <li>
                <a href="#" class="text-primary fw-bold no-underline">
                  Project Management
                  <span class="material-icons">chevron_right</span>
                </a>
                <p class="text-muted">3,705,829 learners</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrendingNow"
};
</script>

<style scoped>
.container-fluid {
  background-color: #F7F9FA;
}

h2 {
  font-size: 30px; 
  font-weight: 900;
}

h3 {
  font-size: 28px; 
  font-weight: 900;
}

h4 {
  font-size: 24px; 
  font-weight: 900;
}

ul li a {
  font-size: 17px;
  font-weight: 800;
}

ul li p.text-muted {
  font-size: 13px; 
  font-weight: 600;
}

.trending-btn {
  margin-top: 10px;
  font-weight: 700;
  background-color: #F7F9FA;
  border: 1px solid black;
  padding: 10px 70px;
}

.trending-btn:hover {
  background-color: #DCE2E6;
}

.text-muted {
  font-weight: 600;
}

.no-underline {
  text-decoration: none !important;
}

.material-icons {
  font-size: 17px;
  vertical-align: middle;
  margin-left: 4px;
}
</style>
