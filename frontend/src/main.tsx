import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import Bookmarks from "./pages/Bookmarks";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
      <Route
        path="dashboard"
        element={
            <Dashboard />
        }
      />
      <Route
        path="bookmarks"
        element={
            <Bookmarks/>
        }
      />
      <Route
        path="sign-in"
        element={
            <Signin />
        }
      />
      <Route
        path="sign-up"
        element={
            <Signup />
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
);
