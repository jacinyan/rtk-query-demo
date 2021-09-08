export interface ITVShow {
  poster_path?: string | null;
  popularity?: number;
  id?: number;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  first_air_date?: string | null;
  original_language?: string;
  vote_count?: number;
  name: string;
}

export type TColumns = {
  Header: string;
  accessor: keyof ITVShow;
}[];

export type IGetTVShowsResponse = {
  results: ITVShow[];
  page: number;
  total_pages: number;
  total_results: number;
};
