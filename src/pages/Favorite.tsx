import { Card } from "../components/Card/Card";
import { useMovieContext } from "../context/MovieContext";

export function Favorite() {
  const { favoriteMovies } = useMovieContext();

  return (
    <div>
      <h1>Favorite</h1>
      {favoriteMovies && favoriteMovies.map(movie => {
        return <Card key={movie.id} movie={movie} />
      })}
    </div>
  );
}
