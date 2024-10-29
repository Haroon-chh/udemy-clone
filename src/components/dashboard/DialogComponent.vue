<template>
  <div :class="['hover-dialog', dialogPositionClass]">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h5 class="dialog-title">{{ card.title }}</h5>
      <span v-if="card.bestseller" class="badge bg-success">Bestseller</span>
    </div>
    <p class="text-muted">Updated {{ card.updatedDate }}</p>
    <ul>
      <li v-for="(point, index) in card.points" :key="index">
        <span class="me-2 text-success">✔️</span>{{ point }}
      </li>
    </ul>
    <p class="text-muted">{{ card.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.hover-dialog {
  position: absolute;
  top: 0;
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}

.dialog-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.hover-dialog ul {
  padding-left: 20px;
  list-style: none;
}

.hover-dialog ul li {
  margin-bottom: 8px;
}

.text-muted {
  font-size: 0.9rem;
}
</style>
