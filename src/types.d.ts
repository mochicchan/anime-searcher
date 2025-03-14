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

interface AnilistSearchResults {
  data: {
    Page: AnilistMedia;
  }
}

interface AnilistMedia {
  media: AnilistAnime[];
}

interface AnilistAnime {
  id: number;
  title: {
    romaji: string;
  }
  format: string;
  description: string;
  coverImage: {
    large: string;
  }
}

interface AnilistError {
  errors: {
    message: string;
    status: number;
    locations: {
      line: number;
      column: number;
    }[]
  }[]
  data: null;
}

type Status = "loading" | "fulfilled" | "errored" | undefined