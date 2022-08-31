import { useParams } from "react-router-dom";
import { IconButton } from "../../components/IconButton/IconButton";
import { useAsync } from "../../hooks/useAsync";
import { getMovieDetail } from "../../services/movie";
import { Movie } from "../../types/Movie";
import { getImgUrl } from "../../utils/getImgUrl";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMovieContext } from "../../context/MovieContext";
import './Detail.scss'
import { formateDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
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
            <img
              className="poster"
              src={getImgUrl({ string_url: movie?.poster_path, width: 300, height: 450 })} alt={movie.title} />
          )}
          <div className="detail-content">
            <div className="title">
              <h2>{movie.title}</h2>
              <span>({new Date(movie.release_date).getFullYear()})</span>
            </div>
            <div className="date-and-genres">
              <p className="release-date">{formateDate(movie.release_date)}</p>
              <span className="dot"></span>
              <p className="genres">{movie.genres.map((genre, index, arr) => {
                return arr.length - 1 !== index ? `${genre.name}, ` : `${genre.name}`
              })}</p>
              <span className="dot"></span>
              <p>{formatTime(movie.runtime)}</p>
            </div>
            <div className="favorite">
              <IconButton
                aria-label={isFavorite ? 'Add Favorite' : 'Remove Favorite'}
                isActive={isFavorite}
                onClick={toggleFavoriteMovie}
                Icon={isFavorite ? FaHeart : FaRegHeart}
              />
            </div>
            <p className="tagline">{movie.tagline}</p>
            <div className="overview">
              <h2>Overview</h2>
              <p className="overview">{movie.overview}</p>
            </div>
            <p>{movie.vote_average.toFixed(1)}/10 </p>
          </div>
        </div>
      )}
    </>
  );
}
