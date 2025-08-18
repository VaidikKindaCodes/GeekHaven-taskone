import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth() as AuthContextType;

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.add(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(theme === "light" ? "dark" : "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-gray-900 shadow-md">
      <div className="flex justify-between items-center py-4 px-5 sm:px-10 max-w-screen-xl mx-auto">
        <Link
          to="/"
          className="text-xl font-bold text-white hover:text-gray-300 transition"
        >
          Vaidik
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-white">Hello, {user?.username || "User"}</span>
              {/* <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="px-3 py-1 rounded-full shadow bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition text-sm"
              >
                {theme === "light" ? "Dark 🌙" : "Light ☀️"}
              </button> */}
              <Link
                to="/dashboard"
                className="bg-gray-700 px-3 py-1 rounded-2xl text-white transition hover:bg-gray-800 hover:scale-105 text-sm"
              >
                Dashboard
              </Link>
              <Link
                to="/bookmarks"
                className="bg-gray-700 px-3 py-1 rounded-2xl text-white transition hover:bg-gray-800 hover:scale-105 text-sm"
              >
                Bookmarks
              </Link>
              <button
                onClick={logout}
                className="bg-red-700 px-3 py-1 rounded-2xl text-white transition hover:bg-red-600 hover:scale-105 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="flex flex-col gap-4 p-4">
            {isAuthenticated ? (
              <>
                <span className="text-white">Hello, {user?.username || "User"}</span>
                {/* <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-3 py-2 rounded shadow bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition text-sm"
                >
                  {theme === "light" ? "Dark 🌙" : "Light ☀️"}
                </button> */}
                <Link
                  to="/dashboard"
                  className="bg-gray-700 px-3 py-2 rounded-lg text-white hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <Link
                  to="/bookmarks"
                  className="bg-gray-700 px-3 py-2 rounded-lg text-white hover:bg-gray-800"
                >
                  Bookmarks
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-700 px-3 py-2 rounded-lg text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
