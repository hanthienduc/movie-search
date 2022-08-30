import { createContext, ReactNode, useContext, useState } from "react";
import { Movie } from "../types/Movie";

export type MovieProviderType = {
  children: ReactNode
}
export type MovieContextType = {
  searchMovieResult: Movie[]
  createSearchMovieResultLocal: (results: Movie[]) => void
}

const MovieContext = createContext({} as MovieContextType)

export function useMovieContext() {
  return useContext(MovieContext)
}

export function MovieProvider({ children }: MovieProviderType) {

  const [searchMovieResult, setSearchMovieResult] = useState<Movie[]>([])

  function createSearchMovieResultLocal(results: Movie[]) {
    setSearchMovieResult(results)
  }

  return <MovieContext.Provider value={{
    searchMovieResult,
    createSearchMovieResultLocal
  }}>
    {children}
  </MovieContext.Provider>
}