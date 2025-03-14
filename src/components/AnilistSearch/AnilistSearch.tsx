import { useState } from "react";
import style from "./AnilistSearch.module.css";
import { useFetch } from "../../hooks/useFetch";
import { SearchBar } from "../SearchBar";
import { SearchResults } from "../SearchResults";

export default function AnilistSearch() {
  const [search, setSearch] = useState("");
  const [data, status, error] = useFetch(search);

  return (
    <>
      <div className={style.AnilistStyle}>
        <SearchBar setSearch={setSearch} />
        {status === "fulfilled" &&
          data?.map(({ title, id, description, coverImage, format }) => {
            return (
              <SearchResults
                service={"anilist"}
                title={title.romaji}
                id={id}
                format={format}
                description={description}
                image={coverImage.large}
              />
            );
          })}
        {status === "loading" && (
          <>
            <p>Loading...</p>
          </>
        )}
        {status === "errored" && (
          <>
            <p>Error: {error}</p>
          </>
        )}
      </div>
    </>
  );
}
