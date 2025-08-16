import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../context/AuthContext";
import { Link } from "react-router";

function Navbar() {
  const [username, setUsername] = useState("");
  const { token, user, isAuthenticated, logout } = useAuth() as AuthContextType;
  setUsername(user?.username as string);
  return (
    <header className="left-0 right-0 top-0 fixed z-10 bg-gray-900 max-w-7xl mx-auto">
      <div className="flex justify-between items-center py-5 mx-auto sm:px-10 px-5">
        <Link to="/">MyApp</Link>
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <span>Hello, {user?.username|| "User"} </span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
