/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */

import { useEffect, useState } from "react";
import style from "./KitsuSearch.module.css";

/**
 * Kitsu GraphQL query string
 * @constant
 *      @type {string}
 *      @default
 */
const query = `
query($title: String!) {
  searchAnimeByTitle(first:10, title: $title) {
    nodes {
      titles {
        canonical
      }
      id
      subtype
      description
      posterImage {
        original {
          url
        }
      }
    }
  }
}`;

/**
 * Constructs the variables for the GraphQL query
 * @param {string} title search query for anime
 * @return {Record<title: string>} the variables for the GraphQL query
 *
 * @example
 * variables("frieren");
 */
const variables = (title: string) => {
  return { title };
};

export default function KitsuSearch() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<KitsuAnime[] | null>(null);
  const [state, setState] = useState<"loading" | "errored" | "fulfilled">();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!search) {
      setData(null);
      return;
    }

    const timeout = setTimeout(() => {
      setState("loading");
      const res = fetch("https://kitsu.app/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: variables(search),
        }),
      });

      res.then((data) => {
        if (data.status !== 200)
          throw new Error(`${data.status}: ${data.statusText}`);

        data
          .json()
          .then((data: KitsuSearchResults | KitsuError) => {
            if ((data as KitsuError).errors)
              throw new Error(`${(data as KitsuError).errors[0].message}`);

            setData((data as KitsuSearchResults).data.searchAnimeByTitle.nodes);
            setState("fulfilled");
          })
          .catch((err: Error) => {
            setError(err.message);
            setState("errored");
          });
      });
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <>
      <input
        className={style.KitsuSearch}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
      />
      {state === "fulfilled" &&
        data?.map(({ titles, id, description, posterImage, subtype }) => {
          return (
            <>
              <a href={`https://kitsu.app/anime/${id}`}>
                <div className={style.Results}>
                  <p className={style.ResultsTitle}>{titles.canonical}</p>
                  <p className={style.ResultsSubtype}>{subtype}</p>
                  <p className={style.ResultsDescription}>{description.en}</p>
                  <img
                    className={style.ResultsImg}
                    src={posterImage.original.url}
                  />
                </div>
              </a>
            </>
          );
        })}
      {state === "loading" && (
        <>
          <p>Loading...</p>
        </>
      )}
      {state === "errored" && (
        <>
          <p>Error: {error}</p>
        </>
      )}
    </>
  );
}
