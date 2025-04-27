type StrapiFilter = {
  $eq?: string | number | boolean;
  $in?: string[] | number[];
  $containsi?: string;
};

export type StrapiFilters = Record<string, StrapiFilter>;
