# 🎬 MovieSearch

A modern movie discovery app built with React and Vite, powered by the TMDB API.

🔗 **Live Demo:** [moviesearch-delta-one.vercel.app](https://moviesearch-delta-one.vercel.app/)

---

## ✨ Features

### 🔍 Search & Discovery

- Full-text movie search by title with instant results
- Browse popular movies on home page
- Genre-based filtering with all TMDB genres
- "All Genres" button to reset to popular movies
- Search query persistence across navigation using sessionStorage
- Empty state messaging for no results

### 📑 Pagination & Infinite Scroll

- Infinite scroll implementation using IntersectionObserver API
- Automatic load more when scrolling to bottom
- Separate loading states for initial load vs load-more
- Movie deduplication to prevent duplicate entries
- Page-aware pagination for all search and genre types

### 🎬 Movie Details Display

- Complete movie information: title, year, rating, runtime, status
- Full plot description with release date and language info
- Genre badges (clickable to filter)
- Budget & revenue in USD currency format
- Top cast members with links to actor profiles
- Director information with link to profile
- High-quality poster images with fallback placeholder
- Smart back navigation (history-aware or home fallback)

### 👤 Actor/Person Pages

- Profile photo with fallback avatar
- Birth date, death date (if applicable), and place of birth
- Known for department (Actor, Director, Producer, etc.)
- Alternative names display
- Full biography with read more/less toggle
- Filmography grid showing up to 12 movies
- "+N more movies" indicator for extended filmography
- Clickable filmography links to movie pages

### 🎥 Trailer Viewing

- Watch Trailer button on movie detail pages
- YouTube embedded trailer player in modal
- Smart trailer selection (official > non-official > teasers)
- Escape key to close modal
- "No trailer available" messaging if not found
- Body scroll lock when modal is open
- Accessible modal with focus management

### ❤️ Favorites Management

- Add/remove favorites with heart icon toggle
- Persistent storage using localStorage
- Dedicated favorites page with all saved movies
- Favorite count display on nav link and favorites page
- Empty state for no favorites
- Works across all pages (Home, MovieDetail, Favorites)

### 🎯 Genre Filtering & Sorting

- Horizontal scrollable genre filter on home page
- Active genre highlighting
- Clear filtering by clicking "All"
- Separate pagination per genre
- Movies sorted by popularity/relevance

### 🌐 Navigation & Routing

- Home page (/) - browse and search movies
- Movie detail page (/movie/:id) - full movie information
- Favorites page (/favourites) - saved movies collection
- Person page (/person/:id) - actor/crew profiles
- 404 page for invalid routes
- Lazy-loaded routes for optimized performance
- Automatic scroll to top on navigation

### ⚡ Loading States & Performance

- Skeleton loaders for initial page load
- Pulsing skeleton cards in movie grid
- Spinner animations for search and trailer loading
- Full-page loaders for detail pages
- Dual-layer caching (in-memory + sessionStorage)
- Configurable TTL for different data types (5 min - 1 hour)
- Request cancellation to prevent memory leaks

### 📱 Responsive Design

- 2-column grid on mobile devices
- 3-4 column grid on tablets
- 5-column grid on desktop
- Desktop hover overlay on movie cards
- Mobile-first approach with Tailwind CSS breakpoints
- Responsive font sizing and spacing

### 🛡️ Error Handling & Reliability

- Route-level error boundaries
- User-friendly error messages
- Try-catch blocks on all async operations
- Poster image fallback for missing images
- API error propagation with retry options
- Graceful cache error handling

### ♿ Accessibility

- Semantic HTML (main, nav, button, dialog)
- ARIA labels and live regions
- Keyboard navigation (Escape, Enter support)
- Focus management in modals
- Lazy-loaded images
- Screen reader support

---

## 🛠️ Built With

- **React 19.2.4** — UI framework with hooks and lazy loading
- **Vite** — Fast build tool and development server
- **React Router v7** — Client-side routing with lazy route loading
- **Tailwind CSS v4** — Utility-first CSS for responsive design
- **React Icons v5** — Icon library (FiFilm, FiHeart, FiSearch, etc.)
- **TMDB API** — Movie, person, and genre data
- **IntersectionObserver API** — Native infinite scroll implementation
- **AbortController** — Request cancellation for cleanup

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

## 🧠 Key Concepts & Architecture

- **8 Custom React Hooks** for modular logic:
  - `useSearch` - Movie search with genre filtering and infinite scroll
  - `useFavourites` - Favorites management with localStorage sync
  - `useMovieDetail` - Single movie fetching with credits
  - `usePersonDetail` - Person profiles with filmography
  - `useTrailer` - Trailer fetching with YouTube filtering
  - `useInfiniteScroll` - IntersectionObserver implementation
  - `useScroll` - Back-to-top button visibility tracking
  - `usePageTitle` - Dynamic document title updates

- **Advanced Caching System** - Dual-layer (in-memory + sessionStorage) with configurable TTL
- **Client-side Routing** with lazy-loaded components for code splitting
- **SessionStorage Persistence** - Search state preserved across navigation
- **IntersectionObserver API** - Efficient infinite scroll implementation
- **Request Cancellation** - AbortController prevents memory leaks from stale requests
- **Error Boundaries** - Route-level error handling for graceful failures
- **Responsive Tailwind CSS** - Mobile-first design with breakpoint-aware layouts
- **Skeleton UI Pattern** - Better perceived performance during loading
- **TMDB API Integration** - Server-side filtering and pagination

---

## 📸 Screenshots

### Home Page — Search, Genre Filter & Infinite Scroll

Browse popular movies, search by title, filter by genre, and enjoy infinite scroll loading
<img src="screenshots/Home.png" width="100%" alt="Home Page with search bar, genre filter, and movie grid" />
<br/><br/>

### Movie Detail Page — Complete Information & Trailer

Full movie info: ratings, runtime, budget, revenue, cast with actor links, and YouTube trailer player
<img src="screenshots/Movie Detail.png" width="100%" alt="Movie Detail page showing poster, info, cast, and trailer" />
<br/><br/>

### Cast Profile Page — Actor Information & Filmography

Actor profiles with biography, birth/death dates, birthplace, and complete filmography with movie links
<img src="screenshots/Cast Profile.png" width="100%" alt="Cast Profile showing actor bio, dates, and filmography" />
<br/><br/>

### Favorites Page — Persistent Saved Movies

All your favorite movies in one place, persisted to localStorage with easy remove functionality
<img src="screenshots/Favourites.png" width="100%" alt="Favorites page displaying saved movies" />

---

## 📝 License

MIT License

_Built as a portfolio project to showcase React, Vite, API integration, and responsive UI design._
