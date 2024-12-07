<template>
  <div>
    <h1>Jokes</h1>
    <NuxtLink to="/jokes/add">Add a Joke</NuxtLink>
    <ul>
      <li v-for="joke in jokes" :key="joke.id">
        <p>{{ joke.setup }}</p>
        <p>{{ joke.punchline }}</p>
        <NuxtLink :to="`/jokes/${joke.id}`">Edit</NuxtLink>
        <button @click="deleteJoke(joke.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useJokes } from "../composables/useJokes";

const { jokes, deleteJoke } = useJokes();
</script>