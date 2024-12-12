<template>
  <div class="min-h-screen flex flex-col">
    <Nav />
    <main class="flex-grow flex flex-col items-center justify-center bg-slate-100 w-full">
      <JokeList />
    </main>
  </div>
</template>

<script setup>
import Nav from "../components/Nav.vue";
import JokeList from "../components/JokeList.vue";
</script>