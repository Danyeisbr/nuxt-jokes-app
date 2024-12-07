import { ref, computed } from "vue";
import type { Joke } from "../types/joke";

export function useJokes() {
  const jokes = ref<Joke[]>(getJokesFromLocalStorage());

  const saveToLocalStorage = () => {
    if (process.client) {
      localStorage.setItem("jokes", JSON.stringify(jokes.value));
    }
  };

  function getJokesFromLocalStorage(): Joke[] {
    if (process.client) {
      const storedJokes = localStorage.getItem("jokes");
      return storedJokes ? JSON.parse(storedJokes) : [];
    }
    return [];
  }

  const addJoke = (newJoke: Joke) => {
    jokes.value.push(newJoke);
    saveToLocalStorage();
  };

  const updateJoke = (updatedJoke: Joke) => {
    const index = jokes.value.findIndex((joke) => joke.id === updatedJoke.id);
    if (index !== -1) {
      jokes.value[index] = updatedJoke;
      saveToLocalStorage();
    }
  };

  const deleteJoke = (id: number) => {
    jokes.value = jokes.value.filter((joke) => joke.id !== id);
    saveToLocalStorage();
  };

  onMounted(() => {
    jokes.value = getJokesFromLocalStorage();
  });

  return {
    jokes,
    addJoke,
    updateJoke,
    deleteJoke,
  };
}
