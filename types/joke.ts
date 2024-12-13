export interface Joke {
  id: number;
  setup: string;
  punchline: string;
  isNew: boolean;
  rating?: number;
}
