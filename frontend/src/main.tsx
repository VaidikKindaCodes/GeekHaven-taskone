import { StrictMode } from "react";
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
import { PrivateRoute } from "./routes/Privateroute";
import Publicroutes from "./routes/Publicroutes";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

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
        path="sign-in"
        element={
          <Publicroutes>
            <Signin />
          </Publicroutes>
        }
      />
      <Route
        path="sign-up"
        element={
          <Publicroutes>
            <Signup />
          </Publicroutes>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
