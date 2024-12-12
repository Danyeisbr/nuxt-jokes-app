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
import { defineProps, computed } from "vue";
import { useJokes } from "../composables/useJokes";

const props = defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const { toggleFavorite, removeJoke, favorites } = useJokes();
const isFavorite = computed(() =>
  favorites.value.some((fav) => fav.id === props.joke.id)
);
</script>

<style>
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
