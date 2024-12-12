<template>
  <div class="joke-item flex flex-col justify-between h-full p-4 border border-gray-300 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-2">{{ joke.setup }}</h2>
    <p class="text-gray-700">{{ joke.punchline }}</p>
    <div class="actions flex justify-between mt-4">
      <button @click="toggleFavorite(joke)" :class="{'bg-red-500 text-white': isFavorite, 'bg-gray-300 text-gray-500': !isFavorite}" class="p-2 rounded-full">
        <HeartIconSolid class="h-6 w-6" />
      </button>
      <button @click="removeJoke(joke.id)" class="text-gray-500 hover:text-gray-700">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useJokes } from "../composables/useJokes";
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/solid';

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

<style scoped>
.joke-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
