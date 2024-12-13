import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import * as action from "../Modules/Movies";
import Reviews from "./Reviews";
import Rating from "./Rating";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addMovie, removeMovie } from "../redux/watchListSlice";
import AddToListsModal from "./AddToListsModal";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingModal, setRatingModal] = useState(false);
  const [listsModal, setListsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { watchlist, user } = useSelector(
    (state) => ({
      watchlist: state.watchlist.watchlist,
      user: state.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await action.MoviePage(id);
      setMovie(response);
    };

    const fetchReviews = async () => {
      const review = await action.fetchReviews(id);
      setReviews(review);
    };

    fetchReviews();
    fetchMovie();
  }, []);

  useEffect(() => {
    const fetchMovieRating = async () => {
      const ratingResponse = await action.fetchRating(id);
      setRating(ratingResponse);
    };
    fetchMovieRating();
  }, [ratingModal]);

  const findMovie = watchlist.filter((item1) => item1.id === Number(id)); //id is returned as string we have to convert it to number

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

  if (movie === null) return <Loader />;

  return (
    <div className="bg-[#2b2a2a] w-full h-full text-white mt-3 pb-28 px-3">
      <div className="xl:max-w-[1280px] lg:max-w-[1024px] m-auto">
        <header className="flex flex-wrap gap-2 justify-end mb-5">
          <button>Cast & crew</button>
          <button>User reviews</button>
          <button>Trivia</button>
          <button>IMDb Pro</button>
          <button>All topics</button>
          <button>share</button>
        </header>

        <div className="flex justify-between mb-3 px-2 md:px-10 pt-5">
          <div className="space-y-2">
            <h1 className="md:text-4xl text-xl font-bold">{movie.title}</h1>
            <div className="text-xs space-x-2 text-gray-400 font-bold">
              <h2 className="inline-block">TV Movie</h2>
              <h2 className="inline-block">{movie.release_date}</h2>
              <h2 className="inline-block">Tv-14</h2>
            </div>
          </div>
          <div className="md:flex gap-20 hidden ">
            <div className="">
              <div className="text-xs text-gray-400 font-bold text-center">
                IMDb RATING
              </div>
              <div className="hover:bg-buttonHover rounded-full hover:cursor-pointer px-3 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 fill-yellow-600 text-yellow-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <span className="font-bold inline ">
                  {movie.vote_average}
                </span>
                /10
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 font-bold">Your RATING</p>
              <button
                className="hover:bg-gray-100 hover:bg-buttonHover rounded-full"
                onClick={() => setRatingModal(!ratingModal)}
              >
                {rating?.rated === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 hover:fill-yellow-600 text-yellow-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                    <span>"Rate"</span>
                  </svg>
                ) : (
                  `${rating?.rated.value} ⭐`
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col md:flex-row justify-center gap-2">
          <div className="flex flex-col-reverse md:flex-row gap-2 items-center justify-center">
            <div className="overflow-hidden hidden md:inline-block rounded-2xl relative md:w-[25vw]  lg:w-[225px] lg:h-[335px] xl:w-[280px] xl:h-[415px]">
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
              <img
                className="object-cover"
                alt="Movie Picture"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </div>

            <div className="overflow-hidden rounded-2xl lg:h-[340px] lg:w-[600px] xl:h-[415px] xl:w-[740px] md:w-[60vw] h-full w-[100vw] aspect-[1/0.6] ">
              <img
                className="w-full h-full"
                alt="movie poster"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              />
            </div>
          </div>

          <div className="flex md:flex-col w-full gap-1 right ">
            <div className="xl:w-[180px] grow xl:h-[205px] lg:w-[135px] lg:h-[165px] px-4 flex flex-wrap justify-center content-center bg-[#383738] rounded-lg font-bold hover:bg-[#383750] cursor-pointer">
              Vidoes
            </div>
            <div className="xl:w-[180px] grow xl:h-[205px] lg:w-[135px] lg:h-[165px] px-4 flex flex-wrap justify-center content-center bg-[#383738] rounded-lg font-bold hover:bg-[#383750] cursor-pointer">
              PHOTOS
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex gap-2">
            <div className="relative w-[120px] h-[180px] md:hidden">
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
              <img
                className=" h-[180px] max-w-[120px]"
                alt="Movie Picture"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-3">
                {movie.genres.map((genre) => {
                  return (
                    <button
                      className="hover:bg-buttonHover border p-1 rounded-full border-white border-opacity-50 px-3"
                      key={genre.id}
                    >
                      {genre.name}
                    </button>
                  );
                })}
              </div>
                <div className="md:w-[500px] w-[815px]">
                  <p>{movie.overview}</p>
                </div>
            </div>
          </div>

          <div className="bg-[#f5c518] text-black rounded-full grow max-w-[300px] xl:w-[350px] lg:w-[305px] h-12 flex items-center justify-between cursor-pointer">
            <div
              className="flex content-center hover:bg-[#a58e30] w-full h-full pl-5 rounded-l-full"
              onClick={() => addToMovieToWatchList(movie, user)}
            >
              <div
                className={`relative px-2 rounded-md overflow-hidden flex items-center justify-center`}
              >
                <span className="text-xl font-bold text-black">
                  {loading ? (
                    <img
                      src="/images/Spinner@1x-1.0s-200px-200px.gif"
                      className="w-10 h-10"
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
                    "+"
                  )}
                </span>
                <div className="absolute bottom-0 left-0 overflow-hidden">
                  <div className="bg-brown-600 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-bold text-xs">Add To Watchlist</p>
                <p className="text-xs">added by users</p>
              </div>
            </div>

            <button
              className="border-l h-full flex items-center border-black pl-1 hover:bg-[#a58e30] pr-5 rounded-r-full"
              onClick={() => setListsModal(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 active:scale-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Reviews reviews={reviews} />
      {listsModal && (
        <AddToListsModal
          setListsModal={setListsModal}
          movie={movie}
          user={user}
        />
      )}

      {ratingModal && (
        <Rating
          movie={movie}
          setRating={setRatingModal}
          ratingModal={ratingModal}
          ratingRes={rating.rated}
        />
      )}
    </div>
  );
}

export default MoviePage;
