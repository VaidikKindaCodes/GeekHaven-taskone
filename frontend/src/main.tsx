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
import App from "./App";
import Bookmarks from "./pages/Bookmarks";
import { PrivateRoute } from "./routes/middlware";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
      <Route
        path="dashboard"
        element={
           <PrivateRoute>
            <Dashboard />
           </PrivateRoute>
            
        }
      />
      <Route
        path="bookmarks"
        element={
            <PrivateRoute>
            <Bookmarks />
           </PrivateRoute>
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
      <RouterProvider router={router} />
);
