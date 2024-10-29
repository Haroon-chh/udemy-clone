<template>
  <section class="testimonials py-5">
    <div class="container-fluid px- px-md-1">
      <h2 class="text-left mb-5">See what others are achieving through learning</h2>

      <!-- Testimonial Cards -->
      <div class="row justify-content-center g-2">
        <div 
          v-for="testimonial in testimonials" 
          :key="testimonial.id" 
          class="col-12 col-md-6 col-lg-3 mb-4 d-flex"
        >
          <div class="testimonial-card p-4 d-flex flex-column h-100 w-100">
            <blockquote class="mb-4 flex-grow-1">
              <img src="@/assets/comma.png" alt="Quote Icon" class="quote-icon">
              <p>
                <strong>{{ testimonial.quote }}</strong>
              </p>
            </blockquote>
            <div class="testimonial-footer mt-auto d-flex align-items-center">
              <img :src="testimonial.image" :alt="testimonial.person" class="rounded-circle me-3" width="60" height="60">
              <div>
                <h5 class="mb-0">{{ testimonial.person }}</h5>
                <small>{{ testimonial.position }}</small>
              </div>
            </div>
            <a :href="testimonial.linkUrl" class="mt-3 d-block text-left">{{ testimonial.linkText }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { testimonials } from '@/data/TestimonialData';

export default {
  name: "TestimonialComponent",
  data() {
    return {
      testimonials
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Suisse+Works:wght@700&display=swap'); /* Import Suisse Works font */

.testimonials {
  background-color: #f9f9f9;
}

.testimonials h2 {
  font-family: 'Suisse Works', serif; /* Apply Suisse Works font */
  font-size: 46px; /* Set font size to 32px */
  font-weight: 900;
  margin-bottom: 40px;
}

.testimonial-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
}

.testimonial-card blockquote {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 20px;
}

.testimonial-footer {
  display: flex;
  align-items: center;
}

.testimonial-footer h5 {
  font-size: 1.1rem;
  margin-bottom: 0;
}

.testimonial-footer small {
  font-size: 0.9rem;
  color: #666;
}

h2:hover{
    text-decoration: underline;
}

a {
  text-decoration: none;
  color: #5022c3;
}
a.text-primary{
    color: #5022c3;
}

a:hover {
  text-decoration: underline;
}

.container-fluid {
  max-width: 1400px; /* Restrict overall width */
}

.change-color{
    color: #5022c3;
}

.quote-icon {
  width: 20px; /* Adjust the size of the quote icon */
  height: 20px;
  margin-right: 10px;
  vertical-align: top; /* Align icon to the top */
}

@media (max-width: 768px) {
  .testimonial-card {
    padding: 1.5rem; /* Adjust padding for small screens */
  }
}
</style>
