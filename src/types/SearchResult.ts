import { Movie } from "./Movie";

export interface SearchResult {
  page: number,
  results: Movie[]
  total_pages: number,
  total_results: number
}