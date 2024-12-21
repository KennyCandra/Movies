import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchListSlice";
import { addToWatchlist, removeFromWatchList } from "../Modules/Movies";
import { useEffect } from "react";

function FunctionalWatchListButton({ movie, loading, setLoading }) {
  const dispatch = useDispatch();
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );
  const [findMovie, setFindMovie] = useState([]);

  useEffect(() => {
    if (watchlist) {
      setFindMovie(watchlist.filter((item1) => item1.id === movie.id) || []);
    }
  },[watchlist]);

  const addToMovieToWatchList = async (movie1, user) => {
    const wantedToAddMovie = watchlist.find((movie) => movie.id === movie1.id);
    try {
      setLoading(true);
      if (!wantedToAddMovie) {
        dispatch(addMovie(movie1));
        await addToWatchlist(movie1.id, user);
      } else {
        dispatch(removeMovie(movie1.id));
        await removeFromWatchList(movie1.id, user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}

export default FunctionalWatchListButton;
