import React, { useEffect, useRef, useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import { useNavigate } from "react-router-dom";
import * as action from "../Modules/Movies";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AddToListsModal from "./AddToListsModal";
import { addMovie, removeMovie } from "../redux/watchListSlice";

function MovieCard({ movie, poster, title, score }) {
  const [features, setFeatures] = useState(false);
  const [myList, setMyList] = useState(false);
  const [movieDetails, setMoviesDetails] = useState(false);
  const btnRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user?.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setFeatures(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const findMovie = watchlist.filter((item1) => item1.id === movie.id) || null;

  const addToMovieToWatchList = async (movie1, user) => {
    try {
      setLoading(true);
      const wantedToAddMovie = watchlist.find(
        (movie) => movie.id === movie1.id
      );
      if (!wantedToAddMovie) {
        dispatch(addMovie(movie1));
        await action.addToWatchlist(movie1.id, user);
      } else {
        dispatch(removeMovie(movie1.id));
        await action.removeFromWatchList(movie1.id, user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-[1px] rounded-lg overflow-hidden border-black w-[10vw] aspect-[1/2.5] md:aspect-[1/2.2] lg:aspect-[1/2] xl:aspect-[1/1.9] relative">
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
            <span className="text-white text-xl font-bold">
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
        {features && (
          <div className="border border-black absolute left-[45%] flex flex-wrap w-28 full top-[10%] z-50">
            <button
              className="border border-black hover:underline hover:bg-white hover:text-black text-white"
              onClick={() => action.addToFavoriteList(movie.id, user)}
            >
              Add To Favourite List
            </button>
            <button
              className="border border-black hover:underline hover:bg-white hover:text-black text-white"
              onClick={() => action.addToWatchlist(movie.id, user)}
            >
              Add To Watch List
            </button>
            <button
              className="border border-black hover:underline hover:bg-white hover:text-black text-white"
              onClick={() => setMyList(!myList)}
            >
              Add To Custom List
            </button>
          </div>
        )}
        {myList && (
          <AddToListsModal
            setListsModal={setMyList}
            movie={movie}
            user={user}
          />
        )}
        <img
          onClick={() => setMoviesDetails(!movieDetails)}
          className={`w-[100%] ${features || myList ? `blur` : `null`}`}
          src={`https://image.tmdb.org/t/p/original/${poster}`}
        />
        <div className="flex flex-col gap-1 items-start px-2 w-full">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="hover:underline font-bold hover:cursor-pointer transition truncate"
          >
            {title}
          </button>
          <div className="w-[100%]" />
          <div className="w-[100%]" />
          <p className="font-bold">{score}⭐</p>
        </div>
      </div>
      {movieDetails && (
        <ExpandedMovie
          name={title}
          movie={movie}
          movieDetails={movieDetails}
          setMoviesDetails={setMoviesDetails}
        />
      )}
    </>
  );
}

export default MovieCard;
