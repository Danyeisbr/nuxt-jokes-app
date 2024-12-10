import { ref, computed } from "vue";
import type { Joke } from "../types/joke";

export function useJokes() {
  const jokes = ref<Joke[]>([]);
  const favorites = ref<Joke[]>([]);
  const isLoading = ref(false);
  const error = ref<null | string>(null);
  const page = ref(1);
  const jokesPerPage = ref(8);
  const sortField = ref<"setup" | "punchline">("setup");
  const sortOrder = ref<"asc" | "desc">("asc");

  const saveToLocalStorage = () => {
    localStorage.setItem("jokes", JSON.stringify(jokes.value));
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const loadFromLocalStorage = () => {
    const storedJokes = localStorage.getItem("jokes");
    const storedFavorites = localStorage.getItem("favorites");
    jokes.value = storedJokes ? JSON.parse(storedJokes) : [];
    favorites.value = storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const fetchJokes = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random/40"
      );
      if (!response.ok) throw new Error("Failed to fetch jokes");
      jokes.value = await response.json();
      saveToLocalStorage();
    } catch (err) {
      error.value = (err as Error).message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  };

  const addJoke = (newJoke: Joke) => {
    jokes.value.unshift(newJoke);
    saveToLocalStorage();
  };

  const removeJoke = (id: number) => {
    jokes.value = jokes.value.filter((joke) => joke.id !== id);
    favorites.value = favorites.value.filter((joke) => joke.id !== id);
    saveToLocalStorage();
  };

  const toggleFavorite = (joke: Joke) => {
    const index = favorites.value.findIndex((fav) => fav.id === joke.id);
    if (index !== -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(joke);
    }
    saveToLocalStorage();
  };

  const sortedJokes = computed(() => {
    const sorted = [...jokes.value].sort((a, b) => {
      const fieldA = a[sortField.value].toLowerCase();
      const fieldB = b[sortField.value].toLowerCase();

      if (fieldA < fieldB) return sortOrder.value === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  });

  const paginatedJokes = computed(() => {
    const start = (page.value - 1) * jokesPerPage.value;
    const end = start + jokesPerPage.value;
    return sortedJokes.value.slice(start, end);
  });

  onMounted(() => {
    loadFromLocalStorage();
    if (jokes.value.length === 0) {
      fetchJokes();
    }
  });

  return {
    jokes,
    favorites,
    isLoading,
    error,
    page,
    jokesPerPage,
    sortField,
    sortOrder,
    fetchJokes,
    addJoke,
    removeJoke,
    toggleFavorite,
    paginatedJokes,
    loadFromLocalStorage,
  };
}
