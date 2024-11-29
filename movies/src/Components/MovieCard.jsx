import React, { useEffect, useRef, useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import { useNavigate } from "react-router-dom";
import * as action from "../Modules/Movies";
import MoviesLists from "./MoviesLists";

function MovieCard({ id, movie, poster, title, score }) {
  const [features, setFeatures] = useState(false);
  const [myList, setMyList] = useState(false);
  const [movieDetails, setMovieDeails] = useState(false);
  const btnRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="border-1 border-black w-[200px] relative">
        <button
          ref={btnRef}
          className="absolute top-0 left-[80%] rounded-[50%] border z-50"
          onClick={() => setFeatures(!features)}
        >
          <img src="/images/1380510-200.png" className="size-7" />
        </button>
        {features && (
          <div className="border border-black absolute left-[45%] flex flex-wrap w-28 full top-[10%] z-50">
            <button
              className="border border-black hover:underline hover:bg-white hover:text-black text-white"
              onClick={() => action.addToFavoriteList(id)}
            >
              Add To Favourite List
            </button>
            <button
              className="border border-black hover:underline hover:bg-white hover:text-black text-white"
              onClick={() => action.addToWatchlist(id)}
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
        {myList && <MoviesLists movie={movie} />}
        <img
          onClick={() => setMovieDeails(!movieDetails)}
          className={`w-[200px] h-[300px] ${features ? `blur` : `null`}`}
          src={`https://image.tmdb.org/t/p/original/${poster}`}
        />
        <div className="flex gap-3 justify-between content-end">
          <div className="flex flex-col gap-1 ">
            <div
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="hover:underline hover:cursor-pointer transition"
            >
              {title}
            </div>
            <p>{score}⭐</p>
          </div>
        </div>
      </div>
      {movieDetails && (
        <ExpandedMovie
          name={title}
          movie={movie}
          setMovieDeails={setMovieDeails}
        />
      )}
    </>
  );
}

export default MovieCard;
