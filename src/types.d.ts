interface KitsuSearchResults {
  data: {
    searchAnimeByTitle: KitsuAnimeNodes;
  };
}

interface KitsuAnimeNodes {
    nodes: KitsuAnime[]
}

interface KitsuAnime {
  id: string;
  titles: {
    canonical: string;
  };
  subtype: string;
  description: {
    en: string;
  };
  posterImage: {
    original: {
      url: string;
    };
  };
}

type KitsuError = {
  errors: {
    message: string;
    locations: {
      line: number;
      column: number;
    }[];
    extensions: {
      value?: unknown;
      problems: {
        explanation: string;
      }[];
    };
  }[];
};
