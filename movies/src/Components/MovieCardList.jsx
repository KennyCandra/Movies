import { useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import * as action from "../Modules/Movies";
import { shallowEqual, useSelector } from "react-redux";

function MovieCardList({ movie, index, watchListMovies }) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const { watchlist } = useSelector(
    (state) => ({
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );

  const findMovie = watchlist.find((element) => {
    return element.id === movie.id;
  });
  return (
    <>
      <div className="w-[867px] p-3 flex flex-col gap-6 m-auto" key={movie.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-[105px] w-[72px] cursor-pointer rounded-lg relative">
              <button
                onClick={() => action.removeFromWatchList(movie.id)}
                className="absolute top-0 left-0"
              >
                <div
                  className={`relative w-8 h-10 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center ${
                    findMovie !== undefined
                      ? "bg-yellow-600 opacity-100"
                      : "bg-gray-500 opacity-50"
                  }`}
                >
                  <span className="text-white text-xl font-bold">
                    {findMovie === undefined ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </span>
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
