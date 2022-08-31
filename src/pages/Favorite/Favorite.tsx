import { Card } from "../../components/Card/Card";
import { useMovieContext } from "../../context/MovieContext";
import './Favorite.scss'
export function Favorite() {
  const { favoriteMovies } = useMovieContext();

  return (
    <div className="favorite-container">
      <h1>Favorites</h1>
      {favoriteMovies && favoriteMovies.map(movie => {
        return <Card key={movie.id} movie={movie} />
      })}
    </div>
  );
}
