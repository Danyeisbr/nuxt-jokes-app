<template>
  <div>
    <h1>Add a Joke</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="setup" placeholder="Setup" required />
      <input v-model="punchline" placeholder="Punchline" required />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useJokes } from "../../composables/useJokes";

const { addJoke } = useJokes();
const setup = ref("");
const punchline = ref("");

const onSubmit = () => {
  addJoke({ id: Date.now(), setup: setup.value, punchline: punchline.value });
  setup.value = "";
  punchline.value = "";
};
</script>
