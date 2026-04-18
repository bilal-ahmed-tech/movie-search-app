# 🎬 MovieSearch

A modern movie discovery app built with React and Vite, powered by the TMDB API.

🔗 **Live Demo:** [moviesearch-delta-one.vercel.app](https://moviesearch-delta-one.vercel.app/)

---

## ✨ Features

- 🔍 Search movies by title with instant results
- 🎭 Filter movies by genre
- 📄 Movie detail pages with cast, crew, release info, budget, revenue, and trailer
- 👤 Person pages with biography and filmography
- 🎞️ Similar movies displayed on movie detail pages
- ❤️ Save favourites with `localStorage` persistence
- 🔙 Back button restores scroll and view state
- 📱 Fully responsive design
- ⚡ Cached search results for faster repeat queries
- 🔄 Load more pagination with skeleton loading
- 🌐 Back to top button
- 🚫 Route-level error handling
- 🖼️ Poster fallback handling for missing images

---

## 🛠️ Built With

- **React** — UI library
- **Vite** — Build tool and development server
- **Tailwind CSS** — Utility-first styling
- **React Router** — Client-side routing
- **TMDB API** — Movie and person data
- **React Icons** — Icon library

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand</strong></summary>

```plaintext
src/
├── assets/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── MainLayout.jsx
│   └── ui/
│       ├── BackToTop.jsx
│       ├── Button.jsx
│       ├── CastList.jsx
│       ├── EmptyState.jsx
│       ├── GenreFilter.jsx
│       ├── HomeSkeleton.jsx
│       ├── MovieCard.jsx
│       ├── RouteErrorBoundary.jsx
│       ├── ScrollToTop.jsx
│       ├── SearchBar.jsx
│       ├── SkeletonCard.jsx
│       └── TrailerModal.jsx
├── constants/
│   └── index.js
├── hooks/
│   ├── useFavourites.js
│   ├── useInfiniteScroll.js
│   ├── useMovieDetail.js
│   ├── usePageTitle.js
│   ├── usePersonDetail.js
│   ├── useScroll.js
│   ├── useSearch.js
│   └── useTrailer.js
├── pages/
│   ├── Favourites.jsx
│   ├── Home.jsx
│   ├── MovieDetail.jsx
│   ├── NotFound.jsx
│   └── Person.jsx
├── services/
│   └── movieService.js
├── utils/
│   ├── cache.js
│   └── helpers.js
└── App.jsx
```

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- TMDB API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
# Clone the repository
git clone https://github.com/bilal-ahmed-tech/movie-search-app

# Navigate to the project folder
cd movie-search-app

# Install dependencies
npm install

# Create a .env file
printf "VITE_TMDB_API_KEY=your_api_key_here" > .env

# Start the development server
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 🔧 Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

---

## 🔑 Environment Variables

Create a `.env` file in the project root with:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

---

## 🧠 Key Concepts Used

- Custom React hooks for search, movie details, favourites, scroll, and trailers
- Client-side routing with `react-router-dom`
- `localStorage` persistence for favourites
- Search caching for faster repeat queries
- Skeleton UI states while loading
- Lazy-loaded routes for code splitting
- Error boundary handling for route failures
- Responsive layout and mobile-first design

---

## 📸 Screenshots

<img src="screenshots/Home.png" width="100%" alt="Home Page" />
<br/><br/>
<img src="screenshots/Detail.png" width="100%" alt="Movie Detail" />
<br/><br/>
<img src="screenshots/Favourites.png" width="100%" alt="Favourites" />

---

## 📝 License

MIT License

*Built as a portfolio project to showcase React, Vite, API integration, and responsive UI design.*
