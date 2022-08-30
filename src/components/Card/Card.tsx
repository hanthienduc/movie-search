import { Movie } from "../../types/Movie"

type CardType = {
  movie: Movie
}

export function Card({ movie }: CardType) {
  return (
    <div className="movie-card">
      <img src="" alt="" className="movie-img" />
      <h1 className="movie-title">{movie.title}</h1>
      <p className="movie-detail">Detail</p>
    </div>
  )
}