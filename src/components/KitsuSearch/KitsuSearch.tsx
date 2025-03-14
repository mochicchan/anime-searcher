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

  useEffect(() => {
    if (!search) {
      setData(null);
      return;
    }

    const timeout = setTimeout(() => {
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

        data.json().then((data: KitsuSearchResults) => {
          setData(data.data.searchAnimeByTitle.nodes);
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
      {data?.map(({ titles, id, description, posterImage, subtype }) => {
        return (
          <>
            <div className={style.Results}>
              <p>{titles.canonical}</p>
              <p>{subtype}</p>
              <p>{description.en}</p>
              <img src={posterImage.original.url} />
            </div>
          </>
        );
      })}
    </>
  );
}

/*
Tomorrow:
- display all information about the results
  - make anime a link
- show a loading indicator when loading (state)
- handle potential errors

Future:
- make a homepage
- routing between Kitsu and AniList search
- make an AniList search
  - document your code
    - learn JSDoc
  - split stuff up into components, functions, and hooks
    - enforce functions are short
      - "max-lines-per-function": ["error", 20]
      - "max-lines": ["error", 30]
    - add hardlinking (import {x} from 'components')
- make AniList and Kitsu search look unique (grab colours from websites)
  - make colour themes
*/

/*
Display results:
- display grid
- grid-template-columns/rows
- grid area
- gap

image width/height 100%
*/

/*
Colour themes:
- CSS variables
- :has()
- color-mix()
*/
