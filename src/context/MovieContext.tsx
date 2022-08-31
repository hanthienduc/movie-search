import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Movie } from "../types/Movie";

export type MovieProviderType = {
  children: ReactNode;
};
export type MovieContextType = {
  searchMovieResult: Movie[];
  createSearchMovieResultLocal: (results: Movie[]) => void;
  favoriteMovies: Movie[];
  addFavoriteMovieLocal: (movie: Movie) => void;
  removeFavoriteMovieLocal: (movie_id: number) => void;
};

const MovieContext = createContext({} as MovieContextType);

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }: MovieProviderType) {
  const [searchMovieResult, setSearchMovieResult] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useLocalStorage<Movie[]>(
    "favorite-movies",
    []
  );

  function createSearchMovieResultLocal(results: Movie[]) {
    setSearchMovieResult(results);
  }

  function addFavoriteMovieLocal(movie: Movie) {
    setFavoriteMovies((prevFavoriteMovies) => {
      const checkExist = prevFavoriteMovies.find(
        (currentMovie) => currentMovie.id === movie.id
      );
      return checkExist ? prevFavoriteMovies : [...prevFavoriteMovies, movie];
    });
  }

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
