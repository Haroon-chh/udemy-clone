<template>
  <div class="container-fluid text-center py-5 banner-container">
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-md-6 my-auto">
        <h1 class="fw-bolder mb-3 large-text">
          Welcome to where <br />
          possibilities begin
        </h1>
      </div>
      <div class="col-md-4 my-auto">
        <img :src="imageUrl" alt="Hero Image" class="img-fluid rounded-circle large-image" />
      </div>
    </div>
    <div class="news-banner">
      <a href="#" class="news-link">Check out our latest company news!</a>
    </div>
  </div>

  <div class="container-fluid d-flex justify-content-center align-items-center text-center skills-container">
    <div>
      <h1 class="fw-bold mb-3">Skills are the key to unlocking potential</h1>
      <p class="lead">
        Whether you want to learn a new skill, train your teams, or share what you know with the world,<br>
        you’re in the right place. As a leader in online learning, we’re here to help you achieve your<br>
        goals and transform your life.
      </p>
    </div>
  </div>

  <div class="container-fluid text-center text-white py-5" style="background-color: #5A2EE3;">
    <h1 class="mb-4 ">Creating impact around the world</h1>
    <p class="mb-5 text-center">
      With our global catalog spanning the latest skills and topics, people and organizations <br>
      everywhere are able to adapt to change and thrive.
    </p>
    <div class="row justify-content-center values">
      <div class="col-md-2 mb-4">
        <h3>73M+</h3>
        <p>Learners</p>
      </div>
      <div class="col-md-2 mb-4">
        <h3>75K+</h3>
        <p>Instructors</p>
      </div>
      <div class="col-md-2 mb-4">
        <h3>250K+</h3>
        <p>Courses</p>
      </div>
      <div class="col-md-2 mb-4">
        <h3>1B+</h3>
        <p>Course enrollments</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-2 mb-4">
          <h3>75</h3>
          <p>Languages</p>
        </div>
        <div class="col-md-2 mb-4">
          <h3>16K+</h3>
          <p>Enterprise customers</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container text-center py-5">
    <p class="mb-4 text-center">
      We help organizations of all types and sizes prepare for the path ahead — wherever it leads.<br>
      Our curated collection of business and technical courses help companies, governments, and<br>
      nonprofits go further by placing learning at the center of their strategies.
    </p>
    <button class="btn btn-dark mb-5">Learn more</button>

    <div class="row">
      <div class="col-md-4">
        <blockquote class="blockquote">
          <p class="quote-icon text-primary">❝</p>
          <p class="testimonial-text">
            Udemy fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace
            and makes them available to customers.
          </p>
          <footer class="blockquote-footer">
            Varun Patil <br>
            <small>Senior Manager of HR Development</small><br>
            <a href="#" class="text-primary">Read the Synechron case study →</a>
          </footer>
        </blockquote>
      </div>

      <div class="col-md-4">
        <blockquote class="blockquote">
          <p class="quote-icon text-primary">❝</p>
          <p class="testimonial-text">
            In total, it was a big success, I would get emails about what a fantastic resource it was.
          </p>
          <footer class="blockquote-footer">
            Alfred Helmerich <br>
            <small>Executive Training Manager</small><br>
            <a href="#" class="text-primary">Read the NTT DATA case study →</a>
          </footer>
        </blockquote>
      </div>

      <div class="col-md-4">
        <blockquote class="blockquote">
          <p class="quote-icon text-primary">❝</p>
          <p class="testimonial-text">
            Udemy responds to the needs of the business in an agile and global manner. It's truly the
            best solution for our employees and their careers.
          </p>
          <footer class="blockquote-footer">
            Luz Santillana Romero <br>
            <small>Development and Engagement Director</small><br>
            <a href="#" class="text-primary">Read the Indra case study →</a>
          </footer>
        </blockquote>
      </div>
    </div>
  </div>

  <div class="container my-5">
    <div class="row text-center">
      <div class="col-md-4 ">
        <div class="p-3">
          <div class="underline-purple mb-3"></div>
          <h4 class="fw-bold">Work with us</h4>
          <p>At Udemy, we're all learners and instructors. We live out our values every day to create a culture that is diverse, inclusive, and committed to helping employees thrive.</p>
          <div class="p-3">
            <a href="#" class="text-purple">Join our team &rarr;</a>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-3">
          <div class="underline-purple mb-3"></div>
          <h4 class="fw-bold">See our research</h4>
          <p>We're committed to improving lives through learning. Dig into our original research to learn about the forces that are shaping the modern workplace.</p>
          <div class="p-3">
            <a href="#" class="text-purple">Learn more &rarr;</a>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="p-3">
          <div class="underline-teal mb-3"></div>
          <h4 class="fw-bold">Read our blog</h4>
          <p>Want to know what we've been up to lately? Check out the Udemy blog to get the <br>scoop on the latest news, ideas, and projects.</p>
          <div class="p-3">
            <a href="#" class="text-teal">Read now &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imageUrl = ref('https://about.udemy.com/wp-content/uploads/2024/02/about-homepage-hero-jan-2024.png');
</script>

  <style scoped>
  /* Container and layout styling */
  .banner-container {
    height: auto; 
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  
  .large-text {
    font-size: 4rem; 
    font-family: 'Times New Roman', Times, serif;
    color: #333;
    text-align: center;
  }
  
  /* Responsive image */
  .large-image {
    border-radius: 70%;
    width: 100%;
    max-width: 600px; 
  }
  
  /* Black banner at the bottom */
  .news-banner {
    width: 100%;
    background-color: #000;
    padding: 20px 0;
    position: relative;
  }
  
 
  .news-link {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }
  
  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    .large-text {
      font-size: 2rem; 
    }
  
    .large-image {
      max-width: 300px; 
    }
  
    .news-link {
      font-size: 0.9rem; /* Adjust text size */
    }
  }
  
  @media (max-width: 576px) {
    .large-text {
      font-size: 1.5rem; 
    }
  
    .large-image {
      max-width: 250px; 
    }
  
    .news-banner {
      padding: 8px 0; /* Adjust padding for smaller screens */
    }
  
    .news-link {
      font-size: 0.8rem; /* Adjust text size */
    }
  }

  .skills-container {
    height: 300px; /* Adjust the height as needed */
    background-color: #f8f9fa;
  }
  
  h1 {
    font-size: 2.5rem; /* Adjusting size of the bold text */
    font-style: suisse works bold;
    color: #333;
  }
  
  p {
    font-size: 1.2rem; /* Paragraph text size */
    color: #555;
  }

  h3 {
    font-weight: bolder;
    font-size: 2.5rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0;
    font-weight: 100;
  }
  .values p, h3{
    text-align: center;
  }
  .quote-icon {
    font-size: 2rem;
    color: #7a1ba2;
  }
  
  .testimonial-text {
    font-size: 1.1rem;
    margin: 1rem 0;
    margin-bottom: 3rem;
  }
  
  .blockquote-footer {
    padding-top: 4%;
    font-weight: bold;
    margin: 5rem 0rem;
    text-align: left;
  }
 
  
  blockquote {
    text-align: left;
  }

  .underline-purple {
    height: 6px;
    background-color: #7a1ba2;
    margin: 0 auto;
    width: max;
  }
  
  .underline-teal {
    height: 6px;
    background-color: #008080;
    width: max;
    margin: 0 auto;
  }
  
  .text-purple {
    color: #7a1ba2;
    text-align: left;
  }
  
  .text-teal {
    color: #008080;
    text-align: left;

  }
  
  h4 {
    font-weight: 700;
    margin-bottom: 5%;
    text-align: left;
  }
  
  p {
    font-size: 1.2rem;
    text-align: left;
  }

  </style>
  