<template>
  <div class="container-fluid mt-4 mb-3">
    <h2>Learners are viewing</h2>
    <div class="row d-none d-lg-flex row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
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
import { cardsData } from '@/data/cardsData';  // Import the data

export default {
  name: 'CardsRow',
  components: { CardComponent },
  setup() {
    const cards = ref(cardsData);  // Use the imported data

    return { cards };
  }
};
</script>

<style scoped>
.card-scroll {
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  padding: 10px;
}

.card-container {
  flex: 0 0 50%;
  scroll-snap-align: start;
  padding-right: 15px;
}
</style>
