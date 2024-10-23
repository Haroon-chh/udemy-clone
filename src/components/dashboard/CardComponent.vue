<template>
  <div class="card-container h-100" @mouseenter="showDialog" @mouseleave="hideDialog">
    <div class="card h-100 d-flex flex-column justify-content-between">
      <img :src="card.image" class="card-img-top" alt="Card image">
      <div class="card-body">
        <h5 class="card-title">{{ card.title }}</h5>
        <p class="card-text text-muted">{{ card.instructor }}</p>
        <div class="d-flex align-items-center mb-2">
          <span class="text-warning">★★★★</span>
          <strong class="ms-1">{{ card.rating }}</strong>
          <span class="text-muted ms-2">({{ card.reviews }} reviews)</span>
        </div>
        <div>
          <span class="text-danger">{{ card.price }}</span>
          <span class="text-muted text-decoration-line-through ms-2">{{ card.oldPrice }}</span>
        </div>
        <span v-if="card.bestseller" class="badge bg-success mt-2">Bestseller</span>
      </div>
    </div>

    <div v-if="isDialogVisible" :class="['hover-dialog', dialogPositionClass]">
      <div class="arrow" :class="dialogPositionClass"></div>
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="dialog-title">{{ card.title }}</h5>
      </div>
      <p v-if="card.bestseller" class="badge bg-success">Bestseller</p>
      <span class="text-muted mb-2 ps-3">{{ card.hours }} total hours • All Levels • Subtitles</span>
      <p class="text-muted">Updated {{ card.updatedDate }}</p>
      <p class="text-muted"> {{ card.description }}</p>

      <ul>
        <li v-for="(point, index) in card.points" :key="index">
          <span class="me-2 text-success">✔</span>{{ point }}
        </li>
      </ul>
      <button class="btn w-100" style="background-color: #8710D8; color: white;">Add to cart</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'CardComponent',
  props: {
    card: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const isDialogVisible = ref(false);

    const showDialog = () => {
      isDialogVisible.value = true;
    };

    const hideDialog = () => {
      isDialogVisible.value = false;
    };

    const dialogPositionClass = computed(() => {
      return props.index < 2 ? 'dialog-right' : 'dialog-left';
    });

    return {
      isDialogVisible,
      showDialog,
      hideDialog,
      dialogPositionClass
    };
  }
};
</script>

<style scoped>
.card-container {
  position: relative;
  height: 100%;
}

.card {
  height: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.01);
}

/* Hover dialog style */
.hover-dialog {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  width: 100%;
  height: 500px;
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(17, 17, 17, 0.4);
  z-index: 10;
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}

.dialog-right {
  right: -105%;
}

.dialog-left {
  left: -105%;
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

/* Arrow styling */
.arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.dialog-right .arrow {
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px 15px 10px 0;
  border-color: transparent white transparent transparent;
}

.dialog-left .arrow {
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent white;
}
</style>
