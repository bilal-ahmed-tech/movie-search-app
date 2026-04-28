import { Outlet } from "react-router-dom";
import Header from "./Header";
import BackToTop from "../ui/BackToTop";
import { useSearch } from "../../hooks/useSearch";

function MainLayout() {
  const { clearSearch } = useSearch(); // 👈 move inside component

  return (
    <div className="min-h-screen bg-gray-950">
      <Header onLogoClick={clearSearch} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <BackToTop />
    </div>
  );
}

export default MainLayout;