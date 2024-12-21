import React, { useEffect, useRef, useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import AddToListsModal from "./AddToListsModal";
import FunctionalWatchListButton from "./FunctionalWatchListButton";
import * as action from "../Modules/Movies";

function MovieCard({ movie, poster, title, score }) {
  const [features, setFeatures] = useState(false);
  const [myList, setMyList] = useState(false);
  const [movieDetails, setMoviesDetails] = useState(false);
  const btnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => ({
      user: state.user?.data,
    }),
    shallowEqual
  );

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (btnRef.current && !btnRef.current.contains(event.target)) {
        setFeatures(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <>
      <div
        className="border-[1px] rounded-lg overflow-hidden border-black w-[10vw] aspect-[1/2.5] md:aspect-[1/2.2] lg:aspect-[1/2] xl:aspect-[1/1.9] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-1 rounded-full border border-black"
          onClick={() => setFeatures(!features)}
        >
          <img src="images/1380510-200.png" className="size-5" />
        </button>
        <FunctionalWatchListButton
          movie={movie}
          loading={loading}
          setLoading={setLoading}
        />
        {features && (
          <div
            className="border border-black absolute right-2 flex flex-wrap w-28 full top-[10%] z-50"
            ref={btnRef}
          >
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
