# Jokes Management App

## Project Overview

This project is a jokes management application built using **Nuxt.js** as the framework for a powerful, modern frontend experience. The application leverages **Tailwind CSS** for responsive and sleek styling and **Vue's reactive state management** for seamless user interactions.

### Technologies Used
- **Nuxt.js**: Framework for building modern and performant Vue.js applications.
- **Tailwind CSS**: Utility-first CSS framework for responsive and customizable styling.
- **Vue.js Reactivity**: Reactive state management to ensure dynamic updates across components.
- **LocalStorage**: Used to persist user data such as added jokes, favorites, and ratings.

### Features

1. **Paginated Jokes List**  
   Users can navigate through a list of jokes, displayed with responsive grid styling and pagination support.

2. **Add and Remove Jokes**  
   - Users can add new jokes to the list.  
   - Jokes can be removed seamlessly with dynamic updates.

3. **LocalStorage Integration**  
   - The app persistently stores user-added jokes and ratings in the browser's local storage.

4. **Rate Jokes**  
   Users can assign ratings to jokes using an intuitive star-based rating system.

5. **Favorites Section**  
   - Users can mark jokes as "favorites" to view them later.  
   - **Note**: The Favorites section is currently under development and will be available in future releases.

---

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Future Improvements

Complete the Favorites Section for users to view and manage their favorite jokes.
Enhance the UI with animations and improved styling using Tailwind CSS.
Add user authentication for personalized joke management.

![image](https://github.com/user-attachments/assets/2760bcc0-47e4-4ab4-b360-157791ce3faa)


## Questions and Explanations

### **1. What's a closure? Where in the code is there a closure?**

**Definition:**  
A closure is a function that remembers the variables from its **lexical scope** even when the function is executed outside of that scope. In JavaScript, closures allow functions to "close over" their surrounding environment and retain access to those variables.

**Where in the code is there a closure?**  
Closures can be observed in the `useJokes` composable function, where reactive state variables such as `favorites` and `jokes` are declared and accessed. Functions like `addJoke`, `removeJoke`, `loadFromLocalStorage`, and `saveToLocalStorage` all **close over** these variables.

**Example:**
```javascript
const removeJoke = (id) => {
  const updatedFavorites = favorites.value.filter((joke) => joke.id !== id);
  saveToLocalStorage(updatedFavorites);
};
```

Here, removeJoke forms a closure because it accesses and modifies favorites, a variable declared in the outer scope of the useJokes function. The function "remembers" and has access to favorites even though it's not declared within removeJoke.

2. Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?
Definition of Side-effects:
Side-effects occur in a function when it interacts with or modifies something outside its local scope (e.g., modifying global state, updating the DOM, accessing a database, or localStorage). Pure functions, by contrast, rely only on their inputs and produce predictable outputs without causing side-effects.

Potential side-effects in my code:
1. LocalStorage Modification
Functions like addJoke, removeJoke, and saveToLocalStorage interact with the browser's localStorage, which is a side-effect because it modifies an external state.

Example:
```javascript
const saveToLocalStorage = (updatedFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  favorites.value = [...updatedFavorites];
};
```
Is it expected? Yes, because saving to localStorage is necessary to persist the state.
Can it be avoided? While it cannot be avoided entirely for persistence, we can abstract the localStorage interaction into a separate utility function to make the composable more testable and maintainable.
Improved Example:
```javascript
const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
```
2. Direct State Updates with Reactivity
While Vue's reactivity system handles state updates effectively, there is still a minor side-effect when directly updating the state:

Example:

```javascript
favorites.value = updatedFavorites;
```
Is it expected? Yes, this is a standard way of updating reactive state in Vue.
Can it be avoided? Instead of directly updating state, we could ensure all mutations go through a controlled function to centralize changes and minimize unexpected behavior.

3. Fetching Data (HTTP Requests)
The fetchJokes function performs a side-effect because it makes an HTTP request to fetch jokes:

Example:

```javascript
const response = await fetch("/api/jokes/random/25");
```
Is it expected? Yes, fetching data is inherently a side-effect.
Can it be avoided? We cannot avoid the side-effect itself, but we could wrap this functionality in a reusable service or utility to isolate the fetching logic.


