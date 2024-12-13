import { useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import * as action from "../Modules/Movies";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchListSlice";

function MovieCardList({ movie, index, watchListMovies, setMovies }) {
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [findMovie, setFindMovie] = useState(
    watchListMovies.filter((item1) => item1.id === movie.id) || []
  );

  const addToMovieToWatchList = async (movie1, user) => {
    const wantedToAddMovie = watchlist.find((movie) => movie.id === movie1.id);
    try {
      setLoading(true);
      if (!wantedToAddMovie) {
        setFindMovie(movie);
        dispatch(addMovie(movie1));
        await action.addToWatchlist(movie1.id, user);
      } else {
        setFindMovie([]);
        dispatch(removeMovie(movie1.id));
        await action.removeFromWatchList(movie1.id, user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );

  return (
    <>
      <div className="w-[867px] p-3 flex flex-col gap-6 m-auto" key={movie.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-[105px] w-[72px] cursor-pointer rounded-lg relative">
              <button
                className="absolute top-0 left-0 z-10"
                onClick={() => addToMovieToWatchList(movie, user)}
              >
                <div
                  className={`relative w-8 h-10 rounded-md overflow-hidden flex items-center justify-center ${
                    findMovie.length !== 0
                      ? "bg-yellow-500"
                      : "bg-gray-500 opacity-50 hover:bg-gray-800 hover:opacity-100 "
                  }`}
                >
                  <span className="text-xl font-bold">
                    {loading ? (
                      <img src="/images/Spinner@1x-1.0s-200px-200px.gif" />
                    ) : findMovie.length ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      "+"
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
