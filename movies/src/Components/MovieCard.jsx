import React, { useEffect, useRef, useState } from "react";
import ExpandedMovie from "./ExpandedMovie";
import { useNavigate } from "react-router-dom";
import * as action from "../Modules/Movies";

function MovieCard({ id, movie, poster, title, score }) {
  const [features, setFeatures] = useState(false);
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
          className="absolute top-0 left-[80%] rounded-[50%] border"
          onClick={() => setFeatures(!features)}
        >
          <img src="/images/1380510-200.png" className="size-7" />
        </button>
        {features && (
          <ul className="absolute left-[70%] top-[8%] bg-black">
            <li className="bg-white border hover:cursor-pointer">
              <p
                className="text-sm hover:underline"
                onClick={() => action.addToFavoriteList(id)}
              >
                Add to Favorite List
              </p>
            </li>
            <li
              className="bg-white hover:cursor-pointer"
              onClick={() => action.addToWatchlist(id)}
            >
              <p className="text-sm hover:underline">Add to Watch List</p>
            </li>
            <li className="bg-white">
              <p></p>
            </li>
          </ul>
        )}
        <img
          onClick={() => setMovieDeails(!movieDetails)}
          className="w-[200px] h-[300px]"
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
