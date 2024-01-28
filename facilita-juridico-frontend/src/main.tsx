import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./Components/HomePage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Points from "./Components/Points.tsx";
import Clients from "./Components/Clients.tsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/clients",
    element: <Clients />
  },
  {
    path: "/points",
    element: <Points />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
