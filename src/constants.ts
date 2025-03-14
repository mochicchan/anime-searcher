export const anilistUrl = "https://graphql.anilist.co"
export const kitsuUrl = "https://kitsu.app/api/graphql"

export const anilistQuery = `
query($title: String) {
  Page(page: 1, perPage:10) {
    media(search: $title, type: ANIME) {
      id
      title {
        romaji
      }
      format
      description
      coverImage {
        large
      }
    }
  }
}`

/**
 * Kitsu GraphQL query string
 * @constant
 *      @type {string}
 *      @default
 */
export const kitsuQuery = `
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
export const variables = (title: string) => {
    return { title }
}

