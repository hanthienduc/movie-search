import { Movie } from "../../types/Movie"
import { Card } from "../Card/Card"
import './CardList.scss'
type CardListType = {
  loading: boolean,
  error?: string,
  results: Movie[] | null
}
export function CardList({ loading, error, results }: CardListType) {

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error...</h1>
  }

  return (
    <div className="card-list">
      {results?.map(movie => {
        return <Card key={movie.id} movie={movie} />
      })}
    </div>
  )
}