import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpandedMovie from "./ExpandedMovie";

function MovieCardList({ movie, index, watchListMovies }) {
  const bear = useSelector((state) => state.bear.data);
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const removeFromWatchList = async (movieId) => {
    let url1 =
      "https://api.themoviedb.org/3/account/2147483647/watchlist?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
    const data = {
      media_type: "movie",
      media_id: movieId,
      watchlist: false,
    };
    const header = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
    };
    try {
      const response = await axios.post(url1, data, { headers: header });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-[867px] p-3 flex flex-col gap-6 m-auto" key={movie.id}>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <div className="h-[105px] w-[72px] cursor-pointer rounded-lg">
              <img
                className="rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </div>
            <div>
              <h1 className="font-bold">
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
            <button onClick={() => setShowMovieDetails(true)}>
              Show More Details Bro!
            </button>
            <button onClick={() => removeFromWatchList(movie.id)}>
              Remove ME
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