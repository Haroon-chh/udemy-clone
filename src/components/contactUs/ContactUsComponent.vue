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
  </div>
</template>

<script>
export default {
  name: "AboutUs",
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
.text-section h1 {
  font-family: 'Suisse Works', serif;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
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
</style>
