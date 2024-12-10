<template>
  <div class="joke-item">
    <h2>{{ joke.setup }}</h2>
    <p>{{ joke.punchline }}</p>
    <div class="actions">
      <button @click="toggleFavorite(joke)">
        <i :class="['pi', isFavorite ? 'pi-heart-fill' : 'pi-heart']"></i>
      </button>
      <button @click="removeJoke(joke.id)">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useJokes } from "../composables/useJokes";

defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const { toggleFavorite, removeJoke, favorites } = useJokes();
const isFavorite = computed(() =>
  favorites.value.some((fav) => fav.id === joke.id)
);
</script>

<style scoped>
.joke-item {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
</style>
