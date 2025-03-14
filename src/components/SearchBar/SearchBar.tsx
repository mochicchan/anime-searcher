import { useState } from "react";
import style from "./SearchBar.module.css";

export default function SearchBar({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <input
        className={style.SearchBar}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search Anime..."
      />
    </>
  );
}
