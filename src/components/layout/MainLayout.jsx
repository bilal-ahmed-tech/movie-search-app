import { Outlet } from "react-router-dom";
import Header from "./Header";
import BackToTop from "../ui/BackToTop";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <BackToTop />
    </div>
  );
}

export default MainLayout;
