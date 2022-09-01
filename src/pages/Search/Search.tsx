import { SyntheticEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CardList } from "../../components/CardList/CardList";
import { useMovieContext } from "../../context/MovieContext";
import { useAsyncFn } from "../../hooks/useAsync";
import { searchMovies } from "../../services/movie";
import './Search.scss'
import ReactPaginate from 'react-paginate';

export function Search() {

  const [searchString, setSearchString] = useState<string>('')
  const { searchMovieResult, createSearchMovieResultLocal } = useMovieContext()
  const searchMoviesFunc = useAsyncFn(searchMovies)
  const [selectPage, setSelectPage] = useState<number>(1)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    if (searchString === '' || searchString == null) {
      return
    }
    searchMoviesFunc.execute({ queryString: searchString, selectPage })
      .then((data) => {
        createSearchMovieResultLocal(data)
      })
  }

  useEffect(() => {
    if (searchString !== '') {
      searchMoviesFunc.execute({ queryString: searchString, selectPage })
        .then((data) => {
          createSearchMovieResultLocal(data)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPage])

  function handlePageClick(selectedItem: { selected: number }) {
    setSelectPage(selectedItem.selected + 1)
  }

  return (
    <section className="search-page">
      <h1 >Search Movie</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input data-testid='search-input' className="search-input" autoFocus type="search" value={searchString} placeholder="Search for movie..."
          name="searchString" onChange={(e) => setSearchString(e.target.value)} />
        <button className="search-btn" type="submit">
          <FaSearch />
        </button>
      </form>
      {<CardList loading={searchMoviesFunc.loading}
        error={searchMoviesFunc.error}
        results={searchMovieResult.results} />}

      {searchMovieResult.total_pages > 0 && <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={searchMovieResult.total_pages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />}

    </section>
  )
}