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