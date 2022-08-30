import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getMovieDetail } from "../services/movie"
import { Movie } from "../types/Movie"
import { getImgUrl } from "../utils/getImgUrl"

export function Detail() {

  const { movieId } = useParams()

  const { loading, error, value: movie } = useAsync<Movie>(() => getMovieDetail({ movie_id: movieId }))

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }

  console.log(movie)

  return (
    <>
      {movie !== undefined &&
        (<div className="detail">
          <img src={getImgUrl({ string_url: movie?.poster_path })} alt="" />
        </div>)
      }
    </>

  )
}