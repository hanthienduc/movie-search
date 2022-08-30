import { useParams } from "react-router-dom"

export function Detail() {

  const { movieId } = useParams()

  return (
    <div className="detail">
      {movieId}
    </div>
  )
}