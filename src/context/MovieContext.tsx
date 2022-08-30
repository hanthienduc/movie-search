import { createContext, ReactNode, useContext } from "react";

export type MovieContextType = {
  children?: ReactNode
}

const MovieContext = createContext({})

export function useMovieContext() {
  return useContext(MovieContext)
}

export function MovieProvider({ children }: MovieContextType) {

  return <MovieContext.Provider value={{}}>
    {children}
  </MovieContext.Provider>
}