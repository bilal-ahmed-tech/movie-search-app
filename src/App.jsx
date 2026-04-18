import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";
import ScrollToTop from "./components/ui/ScrollToTop";
import RouteErrorBoundary from "./components/ui/RouteErrorBoundary";
import HomeSkeleton from "./components/ui/HomeSkeleton";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Favourites = lazy(() => import("./pages/Favourites"));
const Person = lazy(() => import("./pages/Person"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { ROUTES } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteErrorBoundary>
        <Suspense fallback={<HomeSkeleton />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.MOVIE} element={<MovieDetail />} />
              <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
              <Route path={ROUTES.PERSON} element={<Person />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
}

export default App;