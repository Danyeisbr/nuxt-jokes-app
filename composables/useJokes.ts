import { ref, computed, onMounted } from "vue";
import type { Joke } from "../types/joke";

export function useJokes() {
  const jokes = ref<Joke[]>([]);
  const favorites = ref<Joke[]>([]);
  const isLoading = ref(false);
  const error = ref<null | string>(null);
  const page = ref(1);
  const jokesPerPage = ref(9);
  const sortField = ref<"setup" | "punchline">("setup");
  const sortOrder = ref<"asc" | "desc">("asc");

  const saveNewJokesToLocalStorage = () => {
    const newJokes = jokes.value.filter(joke => joke.isNew);
    localStorage.setItem("newJokes", JSON.stringify(newJokes));
  };

  const fetchJokes = async () => {
    isLoading.value = true;
    error.value = null;
  
    try {
      const response = await fetch("/api/jokes/random/40");
      if (!response.ok) throw new Error("Failed to fetch jokes");
      const fetchedJokes = await response.json();
      jokes.value = [...jokes.value, ...fetchedJokes];
    } catch (err) {
      error.value = (err as Error).message || "An error occurred";
    } finally {
      isLoading.value = false;
    }
  };
  
  const addJoke = (newJoke: Joke) => {
    newJoke.isNew = true;
    jokes.value.unshift(newJoke);
    saveNewJokesToLocalStorage();
  };

  const removeJoke = (id: number) => {
    jokes.value = [...jokes.value.filter((joke) => joke.id !== id)];
    saveNewJokesToLocalStorage();
  };

  const setRating = (id: number, rating: number) => {
    const joke = jokes.value.find((joke) => joke.id === id);
    if (joke) {
      joke.rating = rating;
      saveNewJokesToLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const storedNewJokes = localStorage.getItem("newJokes");
    const newJokes = storedNewJokes ? JSON.parse(storedNewJokes) : [];
    jokes.value = [...newJokes, ...jokes.value];
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
    const sliced = sortedJokes.value.slice(start, end);
    return sliced;
  });

  const totalPages = computed(() =>
    Math.ceil(jokes.value.length / jokesPerPage.value)
  );

  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

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
    setRating,
    paginatedJokes,
    loadFromLocalStorage,
    totalPages,
    nextPage,
    prevPage,
  };
}
