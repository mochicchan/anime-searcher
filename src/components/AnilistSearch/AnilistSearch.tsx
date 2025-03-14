import { useState } from "react";
import style from "./AnilistSearch.module.css";
import { useFetch } from "../../hooks/useFetch";
import { SearchBar } from "../SearchBar";
import { SearchResults } from "../SearchResults";
import { anilistQuery, anilistUrl } from "../../constants";
import { SearchLoading } from "../SearchLoading";
import yui from "../../assets/yuishrug.png";
import { SearchError } from "../SearchError";

export default function AnilistSearch() {
  const [search, setSearch] = useState("");
  const [data, status, error] = useFetch<AnilistSearchResults>(
    search,
    anilistUrl,
    anilistQuery
  );

  const anime = data?.Page.media;

  return (
    <>
      <div className={style.AnilistStyle}>
        <SearchBar setSearch={setSearch} />
        {status === "fulfilled" &&
          anime?.map(({ title, id, description, coverImage, format }) => {
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
        {status === "loading" && <SearchLoading />}
        {status === "errored" && <SearchError error={error} />}
      </div>
    </>
  );
}
