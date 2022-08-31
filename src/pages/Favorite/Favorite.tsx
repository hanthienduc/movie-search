import { Card } from "../../components/Card/Card";
import { CardList } from "../../components/CardList/CardList";
import { useMovieContext } from "../../context/MovieContext";
import './Favorite.scss'
export function Favorite() {
  const { favoriteMovies } = useMovieContext();

  return (
    <div className="favorite-container">
      <h1>Favorites</h1>
      <CardList results={favoriteMovies} />
    </div>
  );
}
