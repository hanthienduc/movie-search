import { useNavigate } from "react-router-dom"
import { Movie } from "../../types/Movie"
import { getImgUrl } from "../../utils/getImgUrl"

type CardType = {
  movie: Movie
}

export function Card({ movie }: CardType) {

  const navigate = useNavigate()

  function displayMovieDetail() {
    navigate(`movie/${movie.id}`)
  }

  return (
    <div className="card" onClick={displayMovieDetail}>
      <img src={getImgUrl(movie.poster_path)} alt="" className="card-img" />
      <h1 className="card-title">{movie.title}</h1>
      <p className="card-detail">Detail</p>
    </div>
  )
}