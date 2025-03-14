import { NavLink } from "react-router";
import "./App.css";
import { ReactNode } from "react";

function App({ children }: { children?: ReactNode }) {
  return (
    <>
      <nav>
        <NavLink to="/kitsu" end>
          Kitsu
        </NavLink>
        <NavLink to="/anilist" end>
          AniList
        </NavLink>
      </nav>
      {children}
    </>
  );
}

export default App;
