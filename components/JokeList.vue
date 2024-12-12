<template>
  <div class="w-9/12 p-4 bg-white list-jokes">
    <div v-if="isLoading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <JokeItem v-for="joke in paginatedJokes" :key="joke.id" :joke="joke" />
      </div>
    </div>
  </div>

  <div class="w-full flex justify-center gap-4 p-4 shadow-md pagination bg-gray-800 text-white">
    <button
      @click="page--"
      :disabled="page === 1"
      class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      Anterior
    </button>
    <span class="self-center">Página {{ page }} de {{ totalPages }}</span>
    <button
      @click="page++"
      :disabled="page >= totalPages"
      class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
import { useJokes } from "../composables/useJokes";
import JokeItem from "./JokeItem.vue";
const { paginatedJokes, isLoading, error, page, totalPages } = useJokes();
</script>

<style scoped>
.list-jokes {
  min-height: 85.6vh;
}
</style>