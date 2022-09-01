import { Movie } from "../../types/Movie"
import { Card } from "../Card/Card"
import './CardList.scss'
type CardListType = {
  loading?: boolean,
  error?: string,
  results: Movie[] | null,
  cardGrid?: boolean
}
export function CardList({ loading, error, results, cardGrid = false }: CardListType) {

  if (loading) {
    return <h1 className="loading">Loading...</h1>
  }

  if (error) {
    return <h1 className="error-msg">{error}</h1>
  }

  return (
    <div className={`card-list ${cardGrid ? 'd-grid' : 'd-flex'}`}>
      {results?.map(movie => {
        return <Card flexColumn={cardGrid} key={movie.id} movie={movie} />
      })}
    </div>
  )
}