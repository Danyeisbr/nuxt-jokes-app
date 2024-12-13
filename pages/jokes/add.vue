<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Add a Joke</h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="setup" class="block text-sm font-medium text-gray-700">Setup</label>
          <input
            id="setup"
            v-model="setup"
            placeholder="Enter the setup"
            required
            class="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label for="punchline" class="block text-sm font-medium text-gray-700">Punchline</label>
          <input
            id="punchline"
            v-model="punchline"
            placeholder="Enter the punchline"
            required
            class="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Add Joke
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useJokes } from "../../composables/useJokes";

const { addJoke } = useJokes();
const setup = ref("");
const punchline = ref("");

const onSubmit = () => {
  addJoke({ id: Date.now(), setup: setup.value, punchline: punchline.value, isNew: true });
  setup.value = "";
  punchline.value = "";
};
</script>
