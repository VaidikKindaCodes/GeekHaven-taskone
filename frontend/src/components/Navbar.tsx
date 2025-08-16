import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import { Link } from "react-router";

function Navbar() {
  const [username, setUsername] = useState("");
  const { token, user, isAuthenticated, logout } = useAuth() as AuthContextType;
  useEffect(()=>{
    setUsername(user?.username as string);
  } , [])
  
  return (
    <header className="left-0 right-0 top-0 fixed z-10 bg-gray-900 max-w-7xl mx-auto shadow-md">
      <div className="flex justify-between items-center py-4 mx-auto sm:px-10 px-5">
      <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition">MyApp</Link>
      {isAuthenticated ? (
        <div className="flex gap-4 items-center">
        <span className="text-white">Hello, {user?.username || "User"}</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Logout
        </button>
        </div>
      ) : (
        <div className="flex gap-4">
        <Link
          to="/sign-in"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
        >
          Sign In
        </Link>
        <Link
          to="/sign-up"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
        >
          Sign Up
        </Link>
        </div>
      )}
      </div>
    </header>
  );
}

export default Navbar;
