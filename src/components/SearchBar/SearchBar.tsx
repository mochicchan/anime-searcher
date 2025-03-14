import { useState } from "react";

export default function SearchBar({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <input
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search Anime..."
      />
    </>
  );
}
