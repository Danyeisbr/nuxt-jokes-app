<template>
  <div>
    <div class="controls">
      <button @click="goToAddJoke">Agregar Broma</button>
      <button @click="goToFavorites">Favoritos</button>
    </div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="joke-list">
        <JokeItem
          v-for="joke in paginatedJokes"
          :key="joke.id"
          :joke="joke"
        />
      </div>
      <div class="pagination">
        <button @click="page--" :disabled="page === 1">Anterior</button>
        <span>Página {{ page }}</span>
        <button @click="page++" :disabled="page >= totalPages">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useJokes } from "../composables/useJokes";
import JokeItem from "./JokeItem.vue";

const { paginatedJokes, isLoading, error, page, jokesPerPage } = useJokes();

const router = useRouter();

const goToAddJoke = () => {
  router.push("/jokes/add");
};

const goToFavorites = () => {
  router.push("/favorites");
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.joke-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
