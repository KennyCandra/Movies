import { useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import FunctionalWatchListButton from "./FunctionalWatchListButton";
import { useNavigate } from "react-router-dom";

function MovieCardList({ movie, index, watchListMovies }) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[867px] p-3 flex flex-col gap-6 m-auto" key={movie.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-[105px] w-[72px] cursor-pointer rounded-lg relative">
              <FunctionalWatchListButton movie={movie} />
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </div>
            <div>
              <h1
                className="font-bold"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                {index + 1}. {movie.title}
              </h1>
              <p className="font-light">{movie.release_date}</p>
              <p className="font-thin">
                ⭐{movie.vote_average}{" "}
                <span className="font-extralight">({movie.vote_count})</span>
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShowMovieDetails(true)}
              className="flex  flex-wrap justify-center content-center rounded-full w-4 h-4 border-black p-3 border text-blue-500 hover:bg-cyan-300 "
            >
              !
            </button>
          </div>
        </div>
        <div>
          <p className="font-extralight font">{movie.overview}</p>
        </div>
        {index !== watchListMovies.length - 1 ? (
          <div className="divider border w-[98%]" />
        ) : null}
      </div>
      {showMovieDetails && (
        <ExpandedMovie
          name={movie.title}
          setMovieDeails={setShowMovieDetails}
          movie={movie}
        />
      )}
    </>
  );
}

export default MovieCardList;
