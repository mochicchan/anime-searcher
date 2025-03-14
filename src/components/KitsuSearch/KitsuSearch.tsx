import { useEffect, useState } from "react";
import style from "./KitsuSearch.module.css";
import { SearchResults } from "../SearchResults";
import { SearchBar } from "../SearchBar";
import { kitsuQuery, kitsuUrl, variables } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { SearchLoading } from "../SearchLoading";
import { SearchError } from "../SearchError";

export default function KitsuSearch() {
  const [search, setSearch] = useState("");
  const [data, status, error] = useFetch<KitsuSearchResults>(
    search,
    kitsuUrl,
    kitsuQuery
  );

  const anime = data?.searchAnimeByTitle.nodes;

  return (
    <>
      <div className={style.KitsuStyle}>
        <SearchBar setSearch={setSearch} />
        {status === "fulfilled" &&
          anime?.map(({ titles, id, description, posterImage, subtype }) => {
            return (
              <SearchResults
                service={"kitsu"}
                title={titles.canonical}
                id={id}
                description={description.en}
                image={posterImage.original.url}
                format={subtype}
              />
            );
          })}
        {status === "loading" && <SearchLoading />}
        {status === "errored" && <SearchError error={error} />}
      </div>
    </>
  );
}
