import { useState } from "react";
import style from "./AnilistSearch.module.css";
import { useFetch } from "../../hooks/useFetch";

export default function AnilistSearch() {
  const [search, setSearch] = useState("");
  const [data, status, error] = useFetch(search);

  return (
    <>
      <input onChange={(e) => setSearch(e.currentTarget.value)} />
      {status === "fulfilled" &&
        data?.map(({ title, id, description, coverImage, format }) => {
          return (
            <>
              <a href={`https://anilist.co/anime/${id}`}>
                <div>
                  <p>{title.romaji}</p>
                  <p>{format}</p>
                  <p>{description}</p>
                  <img src={coverImage.large} />
                </div>
              </a>
            </>
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
    </>
  );
}
