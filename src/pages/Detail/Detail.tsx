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
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
export function Detail() {
  const { movieId } = useParams();
  const {
    loading,
    error,
    value: movie,
  } = useAsync<Movie>({ func: () => getMovieDetail({ movie_id: movieId }) });

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { favoriteMovies, addFavoriteMovieLocal, removeFavoriteMovieLocal } =
    useMovieContext();

  useEffect(() => {
    if (favoriteMovies !== undefined) {
      const findFavorite = favoriteMovies.find(
        (existingMovie) => existingMovie.id === movie?.id
      );
      if (findFavorite) {
        setIsFavorite(true);
      }
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
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite, movie]);

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (error) {
    return <h1 className="error-msg">Error...</h1>;
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
              loading="lazy"
              className="poster"
              src={getImgUrl({ string_url: movie?.poster_path, width: 300, height: 450 })} alt={movie.title} />
          )}
          <div className="detail-content">
            <div className="title">
              <h2 data-testid='title'>{movie.title}</h2>
              <span>({new Date(movie.release_date).getFullYear()})</span>
            </div>
            <div className="date-and-genres">
              <p className="release-date">{formatDate(movie.release_date)}</p>
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
