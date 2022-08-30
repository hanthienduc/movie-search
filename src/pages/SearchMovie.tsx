import { SyntheticEvent, useState } from "react";
import { CardList } from "../components/CardList/CardList";
import { useMovieContext } from "../context/MovieContext";
import { useAsyncFn } from "../hooks/useAsync";
import { searchMovies } from "../services/movie";

export function SearchMovie() {

  const [searchString, setSearchString] = useState<string>('')
  const { searchMovieResult, createSearchMovieResultLocal } = useMovieContext()
  const searchMoviesFunc = useAsyncFn(searchMovies)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    searchMoviesFunc.execute({ queryString: searchString })
      .then((data) => {
        createSearchMovieResultLocal(data.results)
      })
  }

  return (
    <section className="search-movies">
      <h1>Search Movie</h1>
      <form onSubmit={handleSubmit}>
        <input type="search" value={searchString} placeholder="enter movie name"
          name="searchString" onChange={(e) => setSearchString(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {<CardList loading={searchMoviesFunc.loading}
        error={searchMoviesFunc.error}
        results={searchMovieResult} />}
    </section>
  )
}