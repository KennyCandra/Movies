import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import * as action from "../Modules/Movies";
import Reviews from "./Reviews";
import Rating from "./Rating";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingModal, setRatingModal] = useState(false);

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

  if (movie === null) return <Loader />;

  return (
    <div className="bg-[#2b2a2a] w-full h-full text-white mt-3 pb-28">
      <div className="w-[1280px] m-auto">
        <header className="flex flex-wrap gap-2 justify-end mb-5">
          <button onClick={() => console.log(rating)}>Cast & crew</button>
          <button>User reviews</button>
          <button>Trivia</button>
          <button>IMDb Pro</button>
          <button>All topics</button>
          <button>share</button>
        </header>
        <div className="flex justify-between">
          <div className="flex flex-col gap-3 mb-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex gap-1 text-xs text-gray-400 font-bold">
              <h2>TV Movie</h2>
              <h2>{movie.release_date}</h2>
              <h2>Tv-14</h2>
            </div>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col ">
              <div className="text-xs text-gray-400 font-bold flex flex-wrap justify-center">
                IMDb RATING
              </div>
              <div className="hover:bg-buttonHover rounded-full hover:cursor-pointer px-3">
                ⭐
                <span className="font-bold inline text-xl">
                  {movie.vote_average}
                </span>
                /10
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold">
                Your RATING
              </span>
              <button
                className="hover:bg-gray-100 hover:bg-buttonHover rounded-full"
                onClick={() => setRatingModal(!ratingModal)}
              >
                {rating?.rated === false
                  ? "⭐ Rate"
                  : `${rating?.rated.value} ⭐`}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-between content-center mb-5">
          <div className="w-[280px] h-[415px] overflow-hidden rounded-2xl relative">
            <button
              onClick={() => movie.addToFavoriteList(item.id)}
              className="absolute top-0 left-0"
            >
              <div className="relative w-8 h-10 bg-black opacity-50 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center">
                <span className="text-white text-xl font-bold">+</span>
                <div className="absolute bottom-0 left-0 overflow-hidden">
                  <div className="bg-brown-600 rotate-45 transform origin-top-left"></div>
                </div>
              </div>
            </button>
            <img
              className="h-full w-full"
              alt="Movie Picture"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          </div>
          <div className="h-[415px] w-[800px] overflow-hidden rounded-2xl">
            <img
              className="w-full h-full"
              alt="movie poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-[177px] h-[206px] flex flex-wrap justify-center content-center bg-[#383738] rounded-lg font-bold hover:bg-[#383750] cursor-pointer">
              Vidoes
            </div>
            <div className="w-[177px] h-[206px] flex flex-wrap justify-center content-center bg-[#383738] rounded-lg font-bold hover:bg-[#383750] cursor-pointer">
              PHOTOS
            </div>
          </div>
        </div>
        <div className="mt-1 flex justify-between">
          <div className="">
            <div className="my-5 flex gap-3">
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
            <div className="w-[815px]">
              <p>{movie.overview}</p>
            </div>
          </div>
          <div onClick={() => action.addToFavoriteList(movie.id)}>
            <button className="bg-[#f5c518] text-black rounded-full hover:bg-[#a58e30] h-[48px] w-[231px] px-4">
              <p className="font-bold text-xs">Add To Watchlist</p>
              <p className="text-xs">List your movie , TV & Celebrity picks</p>
            </button>
          </div>
        </div>
      </div>
      <Reviews reviews={reviews} />
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
