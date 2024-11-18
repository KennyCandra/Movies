import { useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import * as action from "../Modules/Movies";

function MovieCardList({ movie, index, watchListMovies }) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  return (
    <>
      <div className="w-[867px] p-3 flex flex-col gap-6 m-auto" key={movie.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-[105px] w-[72px] cursor-pointer rounded-lg relative">
              <button
                onClick={() => action.removeFromWatchList(movie.id)(movie.id)}
                className="absolute top-0 left-0"
              >
                <div className="relative w-8 h-10 bg-gray-500 opacity-50 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center">
                  <span className="text-white text-xl font-bold">👌</span>
                  <div className="absolute bottom-0 left-0 overflow-hidden">
                    <div className="bg-brown-600 rotate-45 transform origin-top-left"></div>
                  </div>
                </div>
              </button>
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </div>
            <div>
              <h1 className="font-bold">
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
