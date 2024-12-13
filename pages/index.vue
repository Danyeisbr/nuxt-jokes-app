<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex flex-col items-center justify-center bg-slate-100 w-full">
      <JokeList />
    </main>
  </div>
</template>

<script setup>
import JokeList from "../components/JokeList.vue";
</script>