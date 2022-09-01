import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Movie } from "../types/Movie";
import { SearchResults } from "../types/SearchResults";

export type MovieProviderType = {
  children: ReactNode;
};
export type MovieContextType = {
  searchMovieResult: SearchResults
  createSearchMovieResultLocal: (searchResults: SearchResults) => void;
  favoriteMovies: Movie[];
  addFavoriteMovieLocal: (movie: Movie) => void;
  removeFavoriteMovieLocal: (movie_id: number) => void;
};

const MovieContext = createContext({} as MovieContextType);

/**
 * a function used to return the MovieContext api
 * @returns {MovieContext}
 */
export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }: MovieProviderType) {
  const [searchMovieResult, setSearchMovieResult] = useState<SearchResults>({} as SearchResults);
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<Movie[]>(
    "favorite-movies",
    []
  );

  // set the results from search and set it to local searchMovieResult state
  function createSearchMovieResultLocal(searchResults: SearchResults) {
    setSearchMovieResult(searchResults);
  }

  /**
   * a function used to add movie to local state and localStorage
   * @param {Movie}  
   * @returns {void}
   */
  function addFavoriteMovieLocal(movie: Movie) {
    setFavoriteMovies((prevFavoriteMovies) => {
      const checkExist = prevFavoriteMovies.find(
        (currentMovie) => currentMovie.id === movie.id
      );
      return checkExist ? prevFavoriteMovies : [...prevFavoriteMovies, movie];
    });
  }

  /**
   * a function used to remove movie from local state and localStorage
   * @param movie_id: number  
   * @returns {void}
   */
  function removeFavoriteMovieLocal(movie_id: number) {
    setFavoriteMovies((prevFavoriteMovies) => {
      return prevFavoriteMovies.filter((movie) => movie.id !== movie_id);
    });
  }

  return (
    <MovieContext.Provider
      value={{
        searchMovieResult,
        createSearchMovieResultLocal,
        favoriteMovies,
        addFavoriteMovieLocal,
        removeFavoriteMovieLocal,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
