<template>
    <div class="reasons-section py-5">
      <div class="container text-center">
        <h2 class="fw-bold mb-5">So many reasons to start</h2>
        <div class="row justify-content-between">
          <!-- Reason 1 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value1-reward.jpg" alt="Teach your way" class="mb-4">
            <h5 class="fw-bold">Teach your way</h5>
            <p>Publish the course you want, in the way you want, and always have control of your own content.</p>
          </div>
          <!-- Reason 2 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value2-reward.jpg" alt="Inspire learners" class="mb-4">
            <h5 class="fw-bold">Inspire learners</h5>
            <p>Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
          </div>
          <!-- Reason 3 -->
          <div class="col-md-3 d-flex flex-column align-items-center mb-4">
            <img src="@/assets/value3-reward.jpg" alt="Get rewarded" class="mb-4">
            <h5 class="fw-bold">Get rewarded</h5>
            <p>Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ReasonsToStart",
  };
  </script>
  
  <style scoped>
  .reasons-section {
    background-color: #FFFFFF; /* Optional light background */
  }
  
  h2 {
    font-family: 'Suisse Works', serif;
  }
  
  img {
    height: 80px;
    width: auto;
  }
  
  p {
    font-size: 1rem;
    color: #6c757d;
  }
  
  .row {
    justify-content: space-between; /* Distribute space between columns */
  }
  </style>
  