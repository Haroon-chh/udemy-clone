<template>
  <div>

    <!-- Image Section (Contact Us) -->
    <div class="banner-container">
      <div class="text-section">
        <h1>Connecting people<br />with knowledge</h1>
      </div>
      <div class="image-section">
        <img src="@/assets/contactperson.png" alt="Person Image" />
      </div>
    </div>
        <!-- Origins Section -->
    <div class="origins-section">
      <h2>Our origins</h2>
      <p class="text-center">
        Growing up in a small Turkish village, Udemy founder Eren Bali had few <br>
        educational opportunities — until he got a computer. Fueled by his
        dream to <br> compete in mathematics, he used the internet to learn his way
        to a silver medal in <br> the International Math Olympiad.
      </p>
      <p class="text-center">
        After learning online changed his life, Eren partnered with co-founders
        Oktay <br> Caglar and Gagan Biyani to achieve a common goal: to make quality
        education <br> accessible to all.
      </p>
    </div>
    <div class="contact-container">
    <h1>Contact us</h1>
    <p>The quickest way to get in touch with us is by using the contact information below.</p>
    <div class="grid-container">
      <div class="grid-item">
        <h2>Learners</h2>
        <a href="#">Visit our Help Center</a><br />
        <a href="#">How to reach our support team</a>
      </div>
      <div class="grid-item">
        <h2>Udemy Business</h2>
        <a href="#">Visit our Help Center</a><br />
        <a href="#">Enterprise New Customer Inquiry</a>
      </div>
      <div class="grid-item">
        <h2>Instructors</h2>
        <a href="#">Visit our Help Center</a><br />
        <a href="#">Explore our Teaching Center</a>
      </div>
      <div class="grid-item">
        <h2>Partners, Resellers & Affiliates</h2>
        <a href="#">Visit our Help Center</a>
      </div>
      <div class="grid-item">
        <h2>Investors</h2>
        <a href="#">Learn more here</a><br />
        <a href="#">Contact our Investor Relations team</a>
      </div>
      <div class="grid-item">
        <h2>Press</h2>
        <a href="#">View general information</a><br />
        <a href="mailto:press@udemy.com">Email press@udemy.com</a>
      </div>
      <div class="grid-item">
        <h2>Privacy</h2>
        <a href="#">View privacy policy</a><br />
        <a href="mailto:privacy@udemy.com">Email privacy@udemy.com</a><br />
        <p>Mail:</p>
        <p>Udemy, Inc.<br />
          Attn: Legal<br />
          600 Harrison Street, 3rd Floor<br />
          San Francisco, CA 94107</p>
      </div>
      <div class="grid-item">
        <h2>European Union Authorities & Trusted Flaggers</h2>
        <a href="#">View Digital Services Act Information</a><br />
        <a href="#">Report Illegal Content Form</a><br />
        <a href="mailto:dsacompliance@udemy.com">Email dsacompliance@udemy.com</a>
      </div>
    </div>
  </div>
     <div class="offices">
    <h1>Our offices</h1>
    <div class="office-list">
      <div class="office" v-for="office in offices" :key="office.location">
        <img :src="office.image" :alt="office.location" />
        <h3>{{ office.location }}</h3>
      </div>
    </div>
  </div>
  <div>
    <p>Check out our <a href="#">Help and Support </a>center to find quick answers to your questions.</p>
  </div>
  </div>
</template>

<script scoped>
export default {
  name: "AboutUs",
  data() {
    return {
      offices: [
        {
          location: 'San Francisco, CA',
          image: 'https://about.udemy.com/wp-content/uploads/2021/07/dublin-1-460x350.jpeg',
        },
        {
          location: 'Denver, CO',
          image: 'https://about.udemy.com/wp-content/uploads/2021/07/denver-460x350.jpeg',
        },
        {
          location: 'Dublin, Ireland',
          image: 'https://about.udemy.com/wp-content/uploads/2021/07/san-francisco-460x350.jpeg',
        },
        {
          location: 'Ankara, Türkiye',
          image: 'https://about.udemy.com/wp-content/uploads/2021/07/ankara-1-450x350.jpeg',
        },
        {
          location: 'Austin, TX',
          image: 'https://about.udemy.com/wp-content/uploads/2023/04/Austin-480x350.png',
        },
        {
          location: 'Melbourne, Australia',
          image: 'https://about.udemy.com/wp-content/uploads/2023/04/Melbourne-480x350.png',
        },
      ],
    };
  },
};
</script>


<style scoped>
/* Origins Section Styling */
.origins-section {
  text-align: center;
  font-family: 'Suisse Works', serif;
  margin: 40px auto;
  padding: 0 20px;
}

.origins-section h2 {
  font-size: 2.5rem;
  font-weight: bold;
}

.origins-section p {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Banner Section Styling (Contact Us) */
.banner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  text-align: center;
}

/* Text Styling */
h1 {
  font-family: 'Suisse Works', serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
}
h2, a, p{
  font-family: 'Suisse Works', serif;
  font-size: 22px;
}
p{
  font-size: 22px;
}

/* Image Styling */
.image-section {
  margin-top: 20px;
}

.image-section img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

/* Media Queries for responsiveness */
@media (min-width: 768px) {
  .banner-container {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .text-section {
    flex: 1;
  }

  .image-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  .image-section img {
    max-width: 500px;
  }
}

@media (min-width: 1024px) {
  .text-section h1 {
    font-size: 5rem;
  }




  .image-section img {
    max-width: 700px;
  }

  .origins-section h2 {
    font-size: 4rem;
  }

  .origins-section p {
    font-size: 1.5rem;
  }
}
p{
  text-align: center;
}
.contact-container {
  text-align: center;
  margin: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Default to a single column */
  gap: 30px;
  padding: 20px;
}

/* .grid-item {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
} */

h2 {
  font-size: 1.2em;
}

a {
  color: #5624d0;
  text-decoration: none;
}

a:hover {
  color: #351486;
}

/* Media Queries for responsiveness */
@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* Two columns for medium screens */
  }
}

@media (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* Three columns for large screens */
  }
}
.offices {
  text-align: center;
  margin: 20px;
}

.office-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.office {
  flex: 1 1 400px;
  max-width: 400px;
  text-align: center;
  border: 1px solid #ddd;
  overflow: hidden;
  transition: transform 0.3s;
}

.office:hover {
  transform: scale(1.05);
}

.office img {
  width: 100%;
  height: auto;
  display: block;
}

.office h3 {
  font-size: 1.2rem;
  margin: 15px 0;
  padding: 0 10px;
}
  
/* Responsive Design */
@media (max-width: 768px) {
  .office-list {
    flex-direction: column;
  }

  .office {
    max-width: 100%;
  }
}
h3{
  font-weight: bold;
}
</style>

