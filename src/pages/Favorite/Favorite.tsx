import { CardList } from "../../components/CardList/CardList";
import { useMovieContext } from "../../context/MovieContext";
import './Favorite.scss'
export function Favorite() {
  const { favoriteMovies } = useMovieContext();

  return (
    <div className="favorite-page">
      <h1 data-testid='favorite-title'>Favorites</h1>
      <CardList cardGrid={true} results={favoriteMovies} />
    </div>
  );
}
