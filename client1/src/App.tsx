// src/main.tsx 或 src/App.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import  routes  from "./routes";
import { Suspense } from "react";
import "./App.css"
export function App() {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  );
}

