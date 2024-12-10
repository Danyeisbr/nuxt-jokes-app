<template>
    <div>
      <h1>Favoritos</h1>
      <div v-if="favorites.length === 0">No tienes bromas favoritas aún.</div>
      <div v-else>
        <div class="joke-list">
          <JokeItem
            v-for="joke in favorites"
            :key="joke.id"
            :joke="joke"
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
  
  <style scoped>
  .joke-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }
  </style>
  