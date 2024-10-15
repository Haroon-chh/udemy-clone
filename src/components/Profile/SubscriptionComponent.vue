<template>
  <div class="container my-5">
    <!-- Main heading -->
    <div class="text-center">
      <h1 class="fw-bold display-4 mb-3">Your Subscription Plans</h1>
      <p class="lead text-muted">Choose the plan that's right for you</p>
    </div>

    <!-- Active plans section -->
    <div class="active-plans-section mb-5">
      <h5 class="fw-bold">Active plans</h5>
      <div class="border border-light rounded p-4 text-center shadow-sm">
        <p class="text-muted mb-0">You don’t have any active subscriptions</p>
      </div>
    </div>

    <!-- Subscription Plan Card -->
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card subscription-card shadow-lg border-0 rounded-4">
          <div class="row g-0">
            <!-- Subscription details -->
            <div class="col-lg-6 p-4">
              <h4 class="fw-bold">Personal Plan</h4>
              <p class="text-muted mb-3">
                Unlock your potential with access to our entire course library:
              </p>
              <ul class="list-unstyled mb-4">
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Access to 12,000+ top courses
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Courses in tech, business, and more
                </li>
                <li class="mb-2">
                  <i class="bi bi-check-circle-fill text-success me-2"></i> Practice tests, exercises, and Q&A
                </li>
              </ul>

              <!-- Buttons -->
              <div class="d-flex align-items-center">
                <button class="btn btn-primary btn-lg me-3">Subscribe</button>
                <a href="#" class="text-decoration-none text-primary">Learn more</a>
              </div>

              <!-- Price and terms -->
              <p class="text-muted mt-3">Starting at <span class="fw-bold">$11.00</span> per month after 7-day trial. Cancel anytime.</p>
            </div>

            <!-- Image section -->
            <div class="col-lg-6 d-none d-lg-block">
              <img :src="subscriptionImage" alt="Subscription plan image" class="img-fluid h-100 rounded-end">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import subscriptionImage from '@/assets/subscription-image.png'; // Make sure to put your actual image path
</script>

<style scoped>
/* Custom styles */
.subscription-card {
  background-color: #f8f9fa;
  border-radius: 16px;
}

h1.display-4 {
  font-size: 2.75rem;
}

h4.fw-bold {
  color: #343a40;
}

.list-unstyled i {
  font-size: 1.2rem;
}

.btn-primary {
  background-color: #6c63ff;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #564fd3;
}

.text-primary {
  font-weight: 500;
}

.text-primary:hover {
  text-decoration: underline;
}

/* Responsive styles */
@media (max-width: 768px) {
  .subscription-card {
    text-align: center;
  }

  .list-unstyled {
    padding-left: 0;
  }

  .col-lg-6 {
    display: block !important;
    margin-top: 2rem;
  }

  h1.display-4 {
    font-size: 2.25rem;
  }

  .btn-lg {
    width: 100%;
    margin-bottom: 1rem;
  }
}

</style>
