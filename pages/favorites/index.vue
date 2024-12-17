<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">This page is under maintenance</h1>
      <p class="text-lg text-gray-600">We are working hard to bring it back soon!</p>
    </div>

    <div class="hidden">
      <h1 class="text-2xl font-semibold text-gray-700 mb-4">Favorites</h1>

      <div v-if="favorites.length === 0" class="text-gray-500 text-lg">
        You don't have any favorite jokes yet.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <JokeItem
          v-for="joke in favorites"
          :key="joke.id"
          :joke="joke"
          class="p-4 bg-white rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJokes } from "../../composables/useJokes";
import JokeItem from "../../components/JokeItem.vue";

const { favorites } = useJokes();
</script>
