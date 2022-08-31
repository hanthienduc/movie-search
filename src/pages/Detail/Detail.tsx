import { useParams } from "react-router-dom";
import { IconButton } from "../../components/IconButton/IconButton";
import { useAsync } from "../../hooks/useAsync";
import { getMovieDetail } from "../../services/movie";
import { Movie } from "../../types/Movie";
import { getImgUrl } from "../../utils/getImgUrl";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMovieContext } from "../../context/MovieContext";

export function Detail() {
  const { movieId } = useParams();
  const {
    loading,
    error,
    value: movie,
  } = useAsync<Movie>(() => getMovieDetail({ movie_id: movieId }));

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { favoriteMovies, addFavoriteMovieLocal, removeFavoriteMovieLocal } =
    useMovieContext();

  useEffect(() => {
    const findFavorite = favoriteMovies.find(
      (existingMovie) => existingMovie.id === movie?.id
    );
    if (findFavorite) {
      setIsFavorite(true);
    }
  }, [favoriteMovies, movie]);

  useEffect(() => {
    if (movie !== undefined) {
      if (isFavorite) {
        addFavoriteMovieLocal(movie);
      } else {
        removeFavoriteMovieLocal(movie?.id);
      }
    }
  }, [isFavorite]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }

  function toggleFavoriteMovie() {
    setIsFavorite((prevState) => !prevState);
  }

  return (
    <>
      {movie !== undefined && (
        <div className="detail">
          {movie.poster_path && (
            <img src={getImgUrl({ string_url: movie?.poster_path })} alt="" />
          )}
          <div className="detail-content">
            <h2 className="title">{movie.title}</h2>
            <p className="overview">{movie.overview}</p>
            <IconButton
              isActive={isFavorite}
              callToggleFavorite={toggleFavoriteMovie}
              Icon={isFavorite ? FaHeart : FaRegHeart}
            />
          </div>
        </div>
      )}
    </>
  );
}
