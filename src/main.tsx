import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AnilistSearch, KitsuSearch } from "./components/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="kitsu"
          element={
            <App>
              <KitsuSearch />
            </App>
          }
        />
        <Route
          path="anilist"
          element={
            <App>
              <AnilistSearch />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
