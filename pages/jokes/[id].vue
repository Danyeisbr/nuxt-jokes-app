<template>
  <div>
    <h1>Edit Joke</h1>
    <form @submit.prevent="onSubmit">
      <input v-model="setup" placeholder="Setup" required />
      <input v-model="punchline" placeholder="Punchline" required />
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useJokes } from "../../composables/useJokes";

const { jokes, updateJoke } = useJokes();
const router = useRouter();
const route = useRoute();

const id = Number(route.params.id);
const joke = jokes.value.find((j) => j.id === id);

const setup = ref(joke?.setup || "");
const punchline = ref(joke?.punchline || "");

const onSubmit = () => {
  updateJoke({ id, setup: setup.value, punchline: punchline.value });
  router.push("/");
};
</script>
