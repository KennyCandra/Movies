import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ExpandedMovie from "./ExpandedMovie";

function MovieCard({ id, movie, poster, title, score }) {
  const [features, setFeatures] = useState(false);
  const btnRef = useRef(null);
  const [movieDetails, setMovieDeails] = useState(false);

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

  const favoriteList = async (movieId) => {
    let url1 =
      "https://api.themoviedb.org/3/account/2147483647/favorite?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
    const data = {
      media_type: "movie",
      media_id: movieId,
      favorite: true,
    };
    const header = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
    };
    try {
      const response = await axios.post(url1, data, { headers: header });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchList = async (movieId) => {
    let url1 =
      "https://api.themoviedb.org/3/account/2147483647/watchlist?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
    const data = {
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    };
    const header = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
    };
    try {
      await axios.post(url1, data, { headers: header });
    } catch (error) {
      console.error(error);
    }
  };
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
                onClick={() => favoriteList(id)}
              >
                Add to Favorite List
              </p>
            </li>
            <li
              className="bg-white hover:cursor-pointer"
              onClick={() => addToWatchList(id)}
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
            <div>{title}</div>
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
