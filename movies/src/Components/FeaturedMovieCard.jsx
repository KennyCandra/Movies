import { useDispatch } from "react-redux";
import {
  addToWatchlist,
  removeFromWatchList,
  fetchRating,
} from "../Modules/Movies";
import { addMovie, removeMovie } from "../redux/watchListSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function FeaturedMovieCard({ movie, user, watchlist, watchListInFeatured }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMovieRating = async () => {
      const ratingResponse = await fetchRating(movie.id);
      setRating(ratingResponse.rated);
    };
    fetchMovieRating();
  }, []);

  const findMovie =
    watchListInFeatured.filter((item1) => item1.id === movie.id) || null;

  const addToMovieToWatchList = async (movie1, user) => {
    try {
      setLoading(true);
      const wantedToAddMovie = watchlist.find(
        (movie) => movie.id === movie1.id
      );
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
    <div
      className={` pb-10 rounded-lg snap-start overflow-hidden flex flex-col border items-stretch relative aspect-[1/2.5] w-[30vw] md:w-[20vw] md:aspect-[1/2.7] lg:aspect-auto xl:w-[200px] lg:w-[150px] cursor-pointer ${
        location.pathname === "/user" ? "bg-white text-black border-black " : "bg-[#1a1a1a] text-white border-white"
      }`}
      key={movie.id}
    >
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
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="movie poster"
      />
      <div className="px-2 h-full flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex gap-3 items-center mt-3">
            <span className="flex gap-1 items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-5 fill-yellow-500 text-yellow-500`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              {movie.vote_average}
            </span>
            <button className="cursor-pointer flex items-center hover:bg-gray-700 px-2 py-1 rounded">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-5 hover:fill-blue-500 text-blue-500 ${
                  rating ? "fill-blue-500" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              {rating?.value}
            </button>
          </div>
          <h1
            className="font-bold  text-sm truncate hover:underline transition"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {movie.title}
          </h1>
        </div>
        <div className="pt-4 flex flex-col">
          <button
            className="bg-[#2b2b2b] w-[100%] rounded-full text-blue-600 font-bold px-4 py-2 flex items-center justify-center gap-2"
            onClick={() => addToMovieToWatchList(movie, user)}
          >
            {loading ? (
              <img
                src="/images/Spinner@1x-1.0s-200px-200px.gif"
                className="size-6"
              />
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
              `+`
            )}{" "}
            Watchlist
          </button>
          <div
            onClick={() => alert(`didn't i tell you we don't have trailers?`)}
            role="button"
            className="rounded-full py-1 mt-4 px-6 font-bold text-base m-auto space-x-3 hover:bg-gray-700"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 fill-white inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            <span>Trailer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedMovieCard;
