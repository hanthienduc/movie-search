import { Movie } from './Movie'

export interface SearchResults {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}
