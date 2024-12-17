<template>
  <div>
    <nav
      class="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      <h1 class="text-xl font-bold cursor-pointer" @click="goHome">Home</h1>
      <div class="space-x-4">
        <select v-model="sortField" class="mr-2 p-2 text-black">
          <option value="setup">Setup</option>
          <option value="punchline">Punchline</option>
        </select>
        <select v-model="sortOrder" class="mr-2 p-2 text-black">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          @click="goToAddJoke"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Joke
        </button>
        <button
          @click="goToFavorites"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Favorites
        </button>
      </div>
    </nav>
    <main class="pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { useJokes } from "../composables/useJokes";

const { sortField, sortOrder, sortedJokes } = useJokes();

const router = useRouter();

const goToAddJoke = () => {
  router.push("/jokes/add");
};

const goToFavorites = () => {
  router.push("/favorites");
};

const goHome = () => {
  router.push("/");
};
</script>
