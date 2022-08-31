import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Movie } from "../../types/Movie"
import { getImgUrl } from "../../utils/getImgUrl"
import './Card.scss'
type CardType = {
  movie: Movie
}

export function Card({ movie }: CardType) {

  const navigate = useNavigate()

  function displayMovieDetail() {
    navigate(`movie/${movie.id}`)
  }

  useEffect(() => {

    function chunkImageSize(e: UIEvent) {
      console.log(e.target)
    }

    window.addEventListener('resize', chunkImageSize)
    return () => {
      return window.removeEventListener('resize', chunkImageSize)
    }
  }, [])

  return (
    <div className="card">
      {movie.poster_path && <img onClick={displayMovieDetail} className="card-img"
        src={getImgUrl({ width: 94, height: 141, string_url: movie.poster_path })} alt={movie.title} />}
      <div className="card-detail">
        <h2 onClick={displayMovieDetail} className="title">{movie.title}</h2>
        <p className="release_date">{movie.release_date}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  )
}