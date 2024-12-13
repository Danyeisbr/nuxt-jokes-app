<template>
  <div class="joke-item flex flex-col justify-between h-full p-4 border border-gray-300 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-2">{{ joke.setup }}</h2>
    <p class="text-gray-700">{{ joke.punchline }}</p>
    <div class="actions flex justify-between mt-4">
      <div class="rating flex items-center gap-1 mt-4 h-6 w-6">
      <span
        v-for="star in 5"
        :key="star"
        @click="rateJoke(star)"
        class="cursor-pointer"
      >
        <component
        :is="star <= (joke.rating || 0) ? StarIconSolid : StarIconOutline"
        :class="star <= (joke.rating || 0) ? 'text-yellow-400' : 'text-gray-400'"
        class="h-6 w-6"
        />
      </span>
    </div>
      <button @click="removeJoke(joke.id)" class="text-gray-500 hover:text-gray-700">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
import { StarIcon as StarIconOutline, StarIcon as StarIconSolid } from "@heroicons/vue/solid";
import { reactive } from "vue";
import { defineProps } from "vue";
import { useJokes } from "../composables/useJokes";

const props = defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const { setRating, removeJoke } = useJokes();

const rateJoke = (rating) => {
  props.joke.rating = rating;
  setRating(props.joke.id, rating);
};
</script>

<style scoped>

.joke-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.rating span {
  font-size: 1.5rem;
}

</style>
