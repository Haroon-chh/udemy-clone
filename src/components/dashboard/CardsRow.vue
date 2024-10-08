<template>
  <div class="container-fluid mt-4">
    <h2>Learners are viewing</h2>
    <div class="row d-none d-lg-flex row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      <!-- Display 4 cards in a row on large screens -->
      <div class="col" v-for="(card, index) in cards" :key="index">
        <CardComponent :card="card" :index="index" />
      </div>
    </div>

    <!-- Swiping functionality for mobile screens -->
    <div class="d-lg-none card-scroll">
      <div class="card-container" v-for="(card, index) in cards" :key="index">
        <CardComponent :card="card" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import CardComponent from './CardComponent.vue';

export default {
  name: 'CardsRow',
  components: { CardComponent },
  setup() {
    const cards = ref([
      {
        image: require('@/assets/100-days-of-code-python.jpg'),
        title: '100 Days of Code: The Complete Python Pro Bootcamp',
        instructor: 'By Dr. Angela Yu, Developer and Lead Instructor',
        rating: 4.7,
        reviews: 326866,
        price: '$13.99',
        oldPrice: '$74.99',
        bestseller: true,
        updatedDate: 'September 2024',  // Additional data for dialog
        description: 'Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        points: ['Learn Python', 'Build Projects', 'Automate Tasks'],
        hours: 56.5,
      },
      {
        image: require('@/assets/Complete-2024-WebDevelopment.jpg'),
        title: 'The Complete 2024 Web Development Bootcamp',
        instructor: 'By Dr. Angela Yu, Developer and Lead Instructor',
        rating: 4.7,
        reviews: 405603,
        price: '$13.99',
        oldPrice: '$74.99',
        bestseller: true,
        updatedDate: '1 week ago',
        description: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps',
        points: ['HTML, CSS, JavaScript', 'React, Node.js', 'APIs and Databases'],
        hours: 50,
      },
      {
        image: require('@/assets/Ultimate-AWS-cloud-architect.jpg'),
        title: '[NEW] AWS Certified Cloud Practitioner',
        instructor: 'By Stephane Maarek | AWS Certified Cloud Practitioner',
        rating: 4.7,
        reviews: 221734,
        price: '$15.99',
        oldPrice: '$84.99',
        bestseller: true,
        updatedDate: '5 days ago',
        description: 'Full Practice Exam included + explanations | Learn Cloud Computing | Pass the AWS Cloud Practitioner CLF-C02 exam!',
        points: ['AWS Basics', 'IAM, EC2, S3', 'Hands-on Labs'],
        hours: 25,
      },
      {
        image: require('@/assets/Ultimate-AWS-cloud-architect.jpg'),
        title: 'AWS Certified Solutions Architect',
        instructor: 'By Stephane Maarek | AWS Certified Solutions Architect',
        rating: 4.7,
        reviews: 236245,
        price: '$15.99',
        oldPrice: '$84.99',
        bestseller: true,
        updatedDate: '3 weeks ago',
        description: 'Full Practice Exam | Learn Cloud Computing | Pass the AWS Certified Solutions Architect Associate Certification SAA-C03!',
        points: ['Architecting on AWS', 'Design Resilient Systems', 'Hands-on Labs'],
        hours: 45,
      }
    ]);

    return { cards };
  }
};
</script>

<style scoped>
/* Horizontal swipe container for mobile view */
.card-scroll {
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  padding: 10px;
}

.card-container {
  flex: 0 0 50%; /* Two cards per row on mobile */
  scroll-snap-align: start;
  padding-right: 15px;
}
</style>
