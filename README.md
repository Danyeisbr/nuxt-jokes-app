# Nuxt Minimal Starter

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
