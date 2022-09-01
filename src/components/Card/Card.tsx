import { useNavigate } from "react-router-dom"
import { Movie } from "../../types/Movie"
import { getImgUrl } from "../../utils/getImgUrl"
import './Card.scss'
type CardType = {
  movie: Movie
  flexColumn?: boolean
}

export function Card({ movie, flexColumn }: CardType) {

  const navigate = useNavigate()

  function displayMovieDetail() {
    navigate(`/movie/${movie.id}`, { replace: true })
  }

  const imageLinkProps = {
    width: flexColumn ? 300 : 94,
    height: flexColumn ? undefined : 141,
    string_url: movie.poster_path
  }

  return (
    <div className={`card ${flexColumn ? 'flex-column' : 'flex-row'}`}>
      {movie.poster_path && <img loading="lazy" onClick={displayMovieDetail} className="card-img"
        src={getImgUrl(imageLinkProps)} alt={movie.title} />}
      <div className="card-detail">
        <h2 onClick={displayMovieDetail} className={`title ${flexColumn ? 'small' : ''}`}>{movie.title}</h2>
        <p className="release_date">{movie.release_date}</p>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  )
}