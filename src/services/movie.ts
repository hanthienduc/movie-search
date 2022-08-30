import { SearchCustomType } from '../types/SearchCustom'
import { makeRequest } from './makeRequest'

// https://api.themoviedb.org/3/search/movie?api_key={apikey}&query=<search_query>
export function searchMovies({ queryString }: SearchCustomType) {
  return makeRequest(
    `/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${queryString}`,
    {
      method: 'GET',
    }
  )
}

//  https://api.themoviedb.org/3/movie/{movie_id}?api_key={apikey})
export function getMovieDetail({ movie_id }: SearchCustomType) {
  return makeRequest(
    `/movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    {
      method: 'GET',
    }
  )
}
