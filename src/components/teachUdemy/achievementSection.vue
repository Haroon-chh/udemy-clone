<template>
  <div class="container-fluid text-center text-white py-1" style="background-color: #5C2CCB;">
    <div class="row g-4 mx-3 my-2">
      <!-- First Stat -->
      <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
        <h2 class="fw-bold">73M</h2>
        <p>Students</p>
      </div>

      <!-- Second Stat -->
      <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
        <h2 class="fw-bold">75+</h2>
        <p>Languages</p>
      </div>

      <!-- Third Stat -->
      <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
        <h2 class="fw-bold">1B</h2>
        <p>Enrollments</p>
      </div>

      <!-- Fourth Stat -->
      <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
        <h2 class="fw-bold">180+</h2>
        <p>Countries</p>
      </div>

      <!-- Fifth Stat -->
      <div class="col-12 col-md mb-4 d-flex flex-column align-items-center">
        <h2 class="fw-bold">16,000+</h2>
        <p>Enterprise customers</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatsSection",
};
</script>

<style scoped>
h2 {
  font-size: 2rem; /* Adjust font size if needed */
}

.row {
  margin-top: 2rem; /* Top margin for the row */
  padding: 1rem;
}

p {
  font-size: 1.2rem; /* Paragraph font size */
  margin: 0; /* Remove default margin */
}

/* Responsive Styling */
@media (max-width: 768px) {
  .row {
    text-align: center; /* Center the text on small screens */
  }

  .col-12 {
    flex: 0 0 100%; /* Make each stat full width on small screens */
    max-width: 100%; /* Prevent flex basis from limiting size */
  }

  .col-md {
    display: block; /* Ensure blocks are stacked vertically on small screens */
  }
}
</style>
