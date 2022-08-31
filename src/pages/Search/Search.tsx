import { SyntheticEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CardList } from "../../components/CardList/CardList";
import { useMovieContext } from "../../context/MovieContext";
import { useAsyncFn } from "../../hooks/useAsync";
import { searchMovies } from "../../services/movie";
import './Search.scss'
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
      <form onSubmit={handleSubmit} className="search-form">
        <input className="search-input" autoFocus type="search" value={searchString} placeholder="Search for movie..."
          name="searchString" onChange={(e) => setSearchString(e.target.value)} />
        <button className="search-btn" type="submit">
          <FaSearch  />
        </button>
      </form>
      {<CardList loading={searchMoviesFunc.loading}
        error={searchMoviesFunc.error}
        results={searchMovieResult} />}
    </section>
  )
}