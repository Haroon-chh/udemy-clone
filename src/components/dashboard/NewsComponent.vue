<template>
  <section class="news-section py-5">
    <div class="container">
      <!-- Heading -->
      <div class="row">
        <div class="col-12 col-md-6 news-div">
          <h1 class="display-4">Top trends for the future of work</h1>
          <p class="">
            GenAI and leadership are at the core of today's skills-based economy.
            Get the 2024 Global Learning & Skills Trends Report to learn more.
          </p>
          <a href="#" class="btn btn-outline-dark btn-lg rounded-0">Get the report →</a>
        </div>
        
        <!-- Image of the report -->
        <div class="col-12 col-md-6">
          <div class="report-image-wrapper">
            <img
              src="@/assets/news-report.png"
              alt="2024 Global Learning & Skills Trends Report"
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NewsComponent",
};
</script>

<style scoped>
.news-section {
  background-color: #f9f9f9;
}
h1 {
  font-family: 'Suisse Works', serif;
  font-weight: 900;
  font-size: 3.5em;
}
.news-div p{
    font-size: 1.5em;
}
@media (max-width: 768px) {
  .news-div p {
    font-size: 1rem;
  }
}
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
}

.report-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.report-image-wrapper img {
  width: 100%;
  max-width: 600px;
  height: auto;
  vertical-align: center;
}
</style>
