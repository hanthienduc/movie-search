import { useParams } from "react-router-dom";
import { IconButton } from "../../components/IconButton/IconButton";
import { useAsync } from "../../hooks/useAsync";
import { getMovieDetail, getMovieVideos } from "../../services/movie";
import { Movie } from "../../types/Movie";
import { getImgUrl } from "../../utils/getImgUrl";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMovieContext } from "../../context/MovieContext";
import './Detail.scss'
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import ReactPlayer from "react-player";
import { Video } from "../../types/Video";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { LazyLoadImageComponent } from "../../components/LazyLoadImage/LazyLoadImageComponent";
import imageHolder from '../../images/imageHolder.png'
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

  const [video, setVideo] = useState<Video>({} as Video)

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

  useEffect(() => {
    if (movieId !== undefined) {
      getMovieVideos({ movie_id: movieId })
        .then(({ results }) => {
          const findTrailer = results.find((video: Video) => video.type === 'Trailer')
          if (findTrailer) {
            setVideo(findTrailer)
          }
        })
        .catch((error) => console.log(error))
    }
  }, [movieId])


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
        <div className="detail-page">
          {movie.poster_path && (
            <LazyLoadImageComponent image={getImgUrl({ string_url: movie?.poster_path, width: 500 })}
              placeholderImage={imageHolder}
            />

          )}
          <div className="detail-content">
            <div className="detail-title">
              <h2 data-testid='title'>{movie.title}</h2>
              <span>({new Date(movie.release_date).getFullYear()})</span>
            </div>
            <div className="detail-subtitle">
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
              <p className="favorite-label">{isFavorite ? 'Remove From' : 'Add To'}  Favorites</p>

            </div>
            <p className="tagline">{movie.tagline}</p>
            <div className="overview">
              <h2>Overview</h2>
              <p className="overview">{movie.overview}</p>
            </div>
            <p className="vote"
            >
              <CircularProgressbar value={Number(movie.vote_average.toFixed(1))}
                maxValue={10}
                text={`${movie.vote_average.toFixed(1)}/10`}
                styles={buildStyles({
                  textSize: '16px',
                  pathColor: `rgba(27, 127, 204, ${Number(movie.vote_average) / 10})`,
                  backgroundColor: '#3545d4',
                })}
              />
            </p>
            <div className="video-player">
              {video && <ReactPlayer width={'100%'} url={`https://www.youtube.com/watch?v=${video?.key}`} />}
            </div>
          </div>

        </div>
      )}

    </>
  );
}
